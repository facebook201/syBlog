# 设计模式之行为模式

Behavioral Patterns







## Observer（观察者模式）

> **允许你定义一种订阅机制，可在对象事件发生时通知多个观察该对象的其他对象。**
>
> **观察者模式一般是 Subject（publisher 主题也就是发布者）和 观察者直接联系（Observer），但是还有一个发布订阅模式（发布者不会直接通知订阅者，他们两个相互不认识 通过第三者 Broker来负责中间调度）**



### 模式的结构 Structure

* 发布者（publisher）会向其他对象发送值得关注的事件。事件会在发布者自身状态改变或执行特定行为后发生。发布者中包含一个允许新订阅这加入和当前订阅者离开列表的订阅架构。
* 当新事件发生时, 发布者会遍历订阅列表并调用每个订阅者对象的通知方法。该方法是订阅者接口中声明的。
* 订阅者 接口声明了通知接口 在绝大多数情况下，该接口仅仅包含一个 update 更新方法。该方法可以拥有多个参数，使用发布者能在更新时传递事件的详细信息。
* 具体订阅者 可以执行一些操作来回应发布者的通知，所有具体订阅者类都实现了同样的接口。因此发布者不需要与具体类相耦合
* 订阅者通常需要一些上下文信息来正确处理更新，因此发布者通常会将一些上下文数据作为通知方法的参数进行传递。发布者也可以将自身作为参数进行传递，使得订阅者直接获取索需要的数据
* 客户端会分别创建发布者和订阅者对象，然后为订阅者注册发布者更新



### 适合的应用场景



* 当一个对象状态的改变需要改变其他对象，或实际对象是事先未知的或动态变化时，可以使用观察者模式。
* 观察者模式允许任何实现了订阅者接口的对象订阅发布者对象的事件通知。 你可在按钮中添加订阅机制， 允许客户端通过自定义订阅类注入自定义代码。
* **当应用中的一些对象必须观察其他对象时**，**可使用该模式**。 **但仅能在有限时间内或特定情况下使用**
* 订阅列表是动态的，订阅者可以随时加入或者离开列表





### 实现方式

1. 仔细检查你的业务逻辑， 试着将其拆分为两个部分： 独立于其他代码的核心功能将作为发布者； 其他代码则将转化为一组订阅类。

2. 声明订阅者接口。 该接口至少应声明一个 `update`方法。

3. 声明发布者接口并定义一些接口来在列表中添加和删除订阅对象。 记住发布者必须仅通过订阅者接口与它们进行交互。

4. 确定存放实际订阅列表的位置并实现订阅方法。 通常所有类型的发布者代码看上去都一样， 因此将列表放置在直接扩展自发布者接口的抽象类中是显而易见的。 具体发布者会扩展该类从而继承所有的订阅行为。

   但是， 如果你需要在现有的类层次结构中应用该模式， 则可以考虑使用组合的方式： 将订阅逻辑放入一个独立的对象， 然后让所有实际订阅者使用该对象。

5. 创建具体发布者类。 每次发布者发生了重要事件时都必须通知所有的订阅者。

6. 在具体订阅者类中实现通知更新的方法。 绝大部分订阅者需要一些与事件相关的上下文数据。 这些数据可作为通知方法的参数来传递。

   但还有另一种选择。 订阅者接收到通知后直接从通知中获取所有数据。 在这种情况下， 发布者必须通过更新方法将自身传递出去。 另一种不太灵活的方式是通过构造函数将发布者与订阅者永久性地连接起来。

7. 客户端必须生成所需的全部订阅者， 并在相应的发布者处完成注册工作。



### 观察者模式优缺点

Y 开闭原则*。 你无需修改发布者代码就能引入新的订阅者类 （如果是发布者接口则可轻松引入发布者类）

Y  你可以在运行时建立对象之间的联系。

N  订阅者的通知顺序是随机的。





### 具体代码 TS版本

**发布者 Subject 和 订阅者 Observer 都定义了一个父类接口， 给具体的类提供了一些方法**

```typescript

/** 管理订阅者的接口 Subejct 也就是发布者 Publisher*/

interface Subject {
  // 将观察者添加到主题上
  attach(observer: Observer): void;

  // 移除观察者
  detach(observer: Observer): void;

  // 通知所有观察者有事件发生
  notify(): void;
}


// 具体的发布者实现通用接口
class ConcreteSubject implements Subject {
  public state: number;

  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }
    console.log('Subject: Attached an observer.');
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('不存在');
    }
    this.observers.splice(observerIndex, 1);
  }

  // 给每一个订阅者触发更新事件
  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}



interface Observer {
  update(subject: Subject): void;
}


class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log('ConcreteObserverA: Reacted to the event.');
    }
  }
}

// 某一个具体的发布者
const subject = new ConcreteSubject();

// 某个具体的观察者
const observer1 = new ConcreteObserverA();

subject.attach(observer1);
```























