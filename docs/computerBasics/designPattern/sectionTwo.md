# 发布订阅模式

发布订阅模式是一种一对多的依赖关系，即当一个对象的状态发生改变的时候，所有依赖于他的对象都会得到通知并自动更新。

* 当一个抽象模型有两个方面，其中一个方面依赖另一个方面，可以将两者封装在独立的对象中 可以让它们各自独立的改变和复用
* 当一个对象的改变的时候 需要同时改变其它对象 但是却不知道具体多少对象有待改变
* 当一个对象必须通知其他对象 但是不知道具体对象到底是谁 本质上并不希望这些对象是紧密耦合的

![border](https://raw.githubusercontent.com/facebook201/sy-fontend-system/master/img/subscribe.png)

例如上面的图，有三个订阅了腾讯新闻，相当于腾讯新闻就是发布者，其他三个人就是订阅者。

## 发布者 腾讯

```javascript

const Tencent = {
  subscribers: [], // 相当于发布者用来收集订阅者订阅信息的地方 

  // 订阅信息 把订阅者订阅信息存到subscribers中
  subscribe(key, fn) {
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
    }
    this.subscribers[key].push(fn);
  },

  // 发布 当订阅的信息有最新状态之后会发布给订阅者
  publish(key) {
    let args = [...arguments];
    let key = args.shift();
    const fns = this.subscribers[key];
    if (!fns || fns.length == 0) {
      return false;
    }
    fns.forEach(fn => fn.apply(this, args));
  },

  // 订阅者如果不想看了还可以取消订阅
  unsubscribe(key) {
    const fns = this.subscribers[key];
    if (!fns || fns.length == 0) {
      return false;
    }
    this.subscribers[key] = this.subscribers[key].filter(item => item !== fn);
  }
};

  const tom = {
    readNews(info) {
      console.log(info);
    }
  };

  Tencent.subscribe('娱乐', tom.readNews);
  Tencent.subscribe('体育', tom.readNews);

  Tencent.publish('娱乐', 'SHE的演唱会');
  Tencent.unsubscribe('娱乐', tom.readNews);

  Tencent.publish('娱乐', 'SHE的演唱会');
  Tencent.publish('体育', '勒布朗的比赛');
```
上面的代码简单的诠释了发布者和订阅者的关系以及订阅过程、发布过程、取消过程。

## 实际应用

### events 模块
在node中 events模块的功能就是一个事件绑定，所有继承自它的实例都具备事件处理的能力，首先它是一个类。
```javascript
function EventEmitter() {
  // 私有属性 保存订阅方法
  this._events = {};
}

EventEmitter.defaultMaxListeners = 10;
module.exports = EventEmitter;
```

### on方法
on方法用于订阅事件。旧版本的是addListener
```javascript
EventEmitter.prototype.on =
    EventEmitter.prototype.addListener = function(type, listener, flag) {
      // 保证存在实例属性
      if (!this._events) this._events = Object.create(null);

      if (this._events[type]) {
        if (flag) {
          // 从头部插入
          this._events[type].unshift(listener);
        } else {
          this._events[type].push(listener);
        }
      } else {
        this._events[type] = [];
      }
      if (type !== 'newListener') {
        this.emit('newListener', type);
      }
    }
```

### emit
emit就是将订阅方法取出执行，使用call方法来修正this的指向。指向子类的实例
```javascript
EventEmitter.prototype.emit = function(type, ...args) {
  if (this._events[type]) {
    this._event[type].forEach(fn => fn.call(this, ...args));
  }
}
```
### once 方法
once方法是将事件订阅 一次，当这个事件触发过就不会再触发了，其原理是将订阅的方法再包裹一层函数，之后将函数移除。
```javascript

EventEmitter.prototype.once = function(type, listener) {
  let _this = this;
  //中间函数 调用完成之后立即删除订阅
  function only() {
    listener();
    _this.removeListener(type, only);
  }
  // 保存原来函数的引用 用于remove时的判断
  only.origin = listener;
  this.on(type, only);
}
```
 
### off方法 退订
```javascript
EventEmitter.prototype.off = 
  EventEmitter.prototype.removeListener = function (type, listener) {
    if (this._events[type]) {
      // 过滤掉退订的方法 从数组中移除
      this._events[type] = this._event[type].filter(fn => {
        return fn !== listener || fn.origin !== listener;
      });
    }
  }
```