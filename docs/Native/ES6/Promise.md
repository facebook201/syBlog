#  Promise

Promise 是异步编程的一种解决方案，它简单来说就是一个对象，用来表示一个异步操作的最终状态(成功或失败)，以及该异步操作的结果值。**Promise里面保存在未来才会结束的事件的结果**。

Promise对象的两个特点：

* 对象的状态不受外界影响。Promise对象表示一个异步操作，有三种状态：pending、fulfilled和rejected。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
* 一旦这个改变，就不会再变，任何时候都可以得到这个结果。只能从pending到fuliled或者rejected。只要这两种情况发生，状态就不凝固，不会再变。会一直保持这个结果，这时就称为resolved。



#### Promise对象的构造语法是

```javascript
let promise = new Promise(function(resolve, reject) {
  // exectutor ( 生产者代码 )
});
```

传递给proimse的函数称为 exectutor （执行者）。当promise被创建时，它会被自动调用。包含生产者代码，最终会产生一个结果。

promise对象的内部属性：

* state —— 最初是 "pending"，然后被改为"fulfilled" 或 rejected
* result —— 一个任意值 初始是undefined

当executor完成任务之后，会调用下面其中一个：

* resolve(value) 说明任务完成
  * 将state 设置为 fufilled
  * 设置 result 为 value

* reject(error) 表明有错误发生
  * 将state 设置为 "rejected"
  * 将result 设置为 error

![border](https://raw.githubusercontent.com/facebook201/sy-fontend-system/master/img/promise.png)



```javascript
let promise = new Promise((resolve, reject) => {
  console.log(resolve); // ƒ () { [native code] }
  alert(reject); // ƒ () { [native code] }
	// 一秒之后 结果为”完成“ 表示任务被完成
  setTimeout(_ => resolve('done'), 1000);
});
```



* 通过new Promise的时候会立即自动调用 executor。
* executor接受两个参数 resolve 和 reject。这些函数来自JavaScript 引擎，不需要创建他们，相反 executor 会在他们准备好时进行调用。

经过一秒之后 executor 调用 resolve("done")来产生结果。

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(_ => reject( new Error('done')), 1000);
});
```

这就是一个错误发生的示例。

**executor应该完成任务，然后调用resolve或者reject来改变promise对象的对应状态。promise结果应该是resolved或rejected的状态被称为settled，而不是pending**



**executor只会调用resolve或reject。promise的最后状态一定会变化。对resolve和reject的深层调用会被忽略**

```javascript
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // ignored 忽略
  setTimeout(() => resolve("…")); // ignored 忽略
});
```



### then 和 catch

当promise对象充当生成这 executor 和 消费函数之间的连接，哪些希望接收结果/错误的函数。假设函数可以使用方法 promise.then 和 promise.catch 进行注册。两个函数 一个是接收成功的 一个是接收失败的。

```javascript
promise.then(function(result){}, function(err) {});

// 成功
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promise.then(
  result => alert(result), // shows "done!" after 1 second
  error => alert(error) // doesn't run
);

// 失败
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise.then(
  result => alert(result), // doesn't run
  error => alert(error) // shows "Error: Whoops!" after 1 second
);
```



### 链式调用 then

```javascript
new Promise(function(resolve, reject) {
  setTimeout(_ => resolve(1), 1000);
}).then(res => {
  return res * 2;
}).then(res => {
  return res * 4;
});
```



### catch 

catch是指定发生错误时的回调函数。

```javascript
new Promise(function(resolve, reject){
  reject(new Error('Whoops!'));
}).catch(err => {
  console.log(err); // Error: Whoops!
});
```

上面的代码在异步操作抛出了错误，状态就会变为rejected，会调用catch方法指定的回调函数，处理这个错误。如果then方法指定的回调函数在运行中抛出错误 也会被catch方法捕获。

**一般来说 不要在then方法里面定义Reject状态的回调函数。即then的第二个参数。Promise 对象后面要跟`catch`方法，这样可以处理 Promise 内部发生的错误。`catch`方法返回的还是一个 Promise 对象，因此后面还可以接着调用`then`方法。**

```javascript
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```

## Promise.resolve(value)

根据给定的value值返回resolved promise。

```javascript
let promise = Promise.resolve(value);
// 等价于
let promise = new Promise(resolve => resolve(value));
```



## Promise.reject(value)

返回一个promise实例，实例状态为rejected。



## Promise.all(iterable)

该方法并行多个promise，并等待所有promise准备就绪。将所有的promise实例包装成一个新的promise实例。

```javascript
let promise = Promise.all([p1, p2, p3]);
```

all方法接收一个数组参数，p1、p2、p3 都是promise实例，如果不是就会先调用Promise.resolve()方法，将参数转为Promise实例，再进一步处理。

promise的状态由参数的三个实例决定，

* 如果三个状态都是fulfilled，promise的状态才会变成fulfilled，此时三个返回值组成一个数组 传递给p的回调函数。
* 只要三个之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值会传给p的回调函数



#### 应用场景

当分别请求两个服务器API，当都返回正确的结果后，再处理相应的逻辑。使用传统的 JavaScript 处理这样的逻辑是相当频繁的。

```javascript
// ...假定p1,p2分别代表两个请求服务端接口(api1, api2)的Promise封装

Promise.all([p1, p2])
.then(rets => {
    // 当p1,p2都返回正确的结果时，处理这里的逻辑
    let [ret1, ret2] = rets2;
   
    console.info(`这是请求接口api1的返回数据：${ret1}`);
    console.info(`这是请求接口api2的返回数据：${ret2}`);
})
```

#### 还可以用来获取github用户数组获取信息

```javascript
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // all responses are ready, we can show HTTP status codes
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));
```





## Promise.race(iterable)

`Promise.race()`方法将多个 `Promise` 实例，包装成一个新的 `Promise` 实例并返回。

`Promise.race()`方法传入的 `Promise` 实例只要有一个率先改变状态，返回的实例就跟着改变状态。

```javascript
const p1 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 500, "foo");
});
const p2 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 100, "bar");
});

Promise.race([p1, p2]).then(function(value) {
  console.info(value); // "bar"
  // 两个都完成，但 p2 更快
});
```

p2比p1率先将状态转变为`fulfilled`，所以`Promise.race()`返回的Promise实例的状态也跟着转变成`fulfilled`。



```javascript
// promise 拥有三个状态 pending、resolve、reject
// Promise的参数是一个executor 表示立即执行的动作

class PromiseA {
  constructor(executor) {
    this.state = 'pending'; // 默认是执行中
    // 默认resolve 的 value值undefined
    this.value = undefined;
    // 默认 reject 的 reason
    this.reason = undefined;

    // 用来保存延迟的
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    // 成功的回调
    let resolve = value => {
      // state改变成fulfilled
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        // 成功之后把 resolve（value）传给promise实例 
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    // 失败的回调
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;

        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    // 如果执行器报错 直接reject
    try {
      executor(resolve, reject);
    } catch (err){
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    console.log(this.state);
    if (this.state === 'fulfilled') {
      // 执行成功的部分
      onFulfilled(this.value);
    }
    // 失败的部分
    if (this.state === 'rejected') {
      onReject(this.reason);
    }

    // 当状态为pending
    if (this.state === 'pending') {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
```



## 总结

`Promise` 类有 4 中静态方法：

1. `Promise.resolve(value)` —— 根据给定值返回 resolved promise，
2. `Promise.reject(error)` —— 根据给定错误返回 rejected promise，
3. `Promise.all(promises)` —— 等待所有的 promise 为 resolve 时返回存放它们结果的数组。如果任意给定的 promise 为 reject，那么它就会变成 `Promise.all` 的错误结果，所以所有的其他结果都会被忽略。
4. `Promise.race(promises)` —— 等待第一个 promise 被解决，其结果/错误即为结果。

这四个方法中，`Promise.all` 在实战中使用的最多。







## Async 函数

async函数是generator的语法糖，更加方便的实现异步操作。

**async函数的特点**

* 内置执行器
* 更好的语义  async表示函数里面有异步，await表示跟在后面的表达式需要等待结果
* async函数的await命令后面，可以是promise对象和原始类型的值( 数值、字符串和布尔值、但这时会自动转成立即resolve的promise对象 )
* 返回值是Promise async函数的返回值是promise对象，这比Generator函数的返回值是Iterator对象方便多。可以用then指定下一步操作。



**函数前面的 async意味着函数总是返回promise，而且await关键字只会在async函数中工作。**

当在async函数里面，语句遇到await就会先返回，等到异步操作完成，再接着执行函数体后面的语句。

```javascript
async function getName() {
  return '张三';
}
// 返回 Promise {<resolved>: "张三"}
```



### Await

正常情况下，**await后面是一个promise对象，返回该对象的结果，如果不是promise对象，就直接返回对应的值**。

```javascript
async function f() {
  let p = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 1000);
  });
  let result = await p; // 等待一秒之后 直到promise执行 resolves()
  alert(result); // 'done!'
}

f();
```

await命令后面的promise对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。



### Error

如果await后面的异步操作出错，等同于async函数返回的promise对象被reject。所有可以在async函数产生的promise对象追加catch来处理。

```javascript
async function f() {
  await new Promise((resolve, reject) => {
    throw new Error('出错了');
  });
}

f()
  .then(v => console.log(v))
  .catch(e => console.log(e)); // Error 出错了

// async 函数中只要一个 await 出现 reject 状态，则后面的 await 都不会被执行。
// 解决办法：可以添加 try/catch。
let a;
async function f() {
    await Promise.reject('error');
    a = await 1; // 这段 await 并没有执行
}
f().then(v => console.log(a));

// 正确的写法 把 await放在 try catch里面
let a;
async function correct() {
    try {
        await Promise.reject('error')
    } catch (error) {
        console.log(error);
    }
    a = await 1;
    return a;
}
```



### 使用注意点

* await命令后面的promise对象，运行结果可能是rejected，所以最好把await命令放在try catch代码块中。
* 多个await命令后面的异步操作 如果不存在继发关系，最好让他们同时触发
* await只能用在async函数中 否则就报错

```javascript
async function myFunction() {
  try {
    await somethingThatReturnsApromise();
  } catch (err) {
    console.lgo(err)
  }
}

// 或者
async function myFunction() {
  await somethingThatReturnsApromise().catch(err => console.log(err));
}

// 多个异步操作
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let foo = await getFoo();
let bar = await getBar();
```



## promise 和 async await的面试题

红绿黄有三个灯， 红灯亮三秒 绿灯亮两秒，黄灯一秒。如果交替不断的重复亮？

```html
  <div class="container">
    <div class="item" id="red">红</div>
    <div class="item" id="green">绿</div>
    <div class="item" id="yellow">黄</div>
  </div>
```

```css
    .container .red {
      background-color: red;
    }
    .container .green {
      background-color: greenyellow;
    }
    .container .yellow {
      background-color: yellow; 
    }
```



Promise写法

```javascript
var red = document.getElementById('red');
var green = document.getElementById('green');
var yellow = document.getElementById('yellow');

function light(color, time) {
  return new Promise((resolve, reject) => {
    color.classList.add(color.id);
    setTimeout(_ => {
      color.classList.remove(color.id);
      resolve();
    }, time);
  });
}

function start() {
  Promise.resolve()
    .then(() => light(red, 3000))
    .then(() => light(green, 2000))
    .then(() => light(yellow, 1000))
    .then(() => start());
}

start();
```

**如果使用了async 和 await 更加清晰**

```javascript
async function start() {
  await light(red, 3000);
  await light(green, 2000);
  await light(yellow, 1000);
  start();
}
start();
```



## 怎么拿到JS异步函数的返回值

```javascript
function getSomething(){
    var r = 0;
    setTimeout(function(){
        r = 2;
    }, 10);
    return r;
}
function compute(){
    var x = getSomething();
    console.log(x);
}
compute();  // 0
```

上面的代码是一个异步问题，当getSomething函数执行返回的结果，还没有执行 r = 2；所以我们得想办法使用一些手段。



### 异步回调函数

可以将函数当成一个参数传进去，这样当延迟执行完 r = 2 之后在执行传进来的回调函数，并且把这个r传进去，这样就可以拿到这个值。 

```javascript
function getSomething(cb) {
  var r = 0;
  setTimeout(() => {
    r = 2;
    cb(2);
  }, 10);
  return r;
}
function compute(x) {
  // 这里可以拿到异步的值
  console.log(x);
  return x;
}

getSomething(compute);
```



### Promise

```javascript
function getSome() {
  var r = 0;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      r = 2;
      resolve(2);
    }, 10);
  });
}

getSome().then(res => {
  console.log(2);
});
```



### Async Await

```javascript
function getSomething() {
	var r = 0;
	return new Promise(function(resolve) {
		setTimeout(function() {
			r = 2;
			resolve(r);
		}, 10);
	});
}

async function compute() {
	var x = await getSomething();
	alert(x * 2);
}
compute();

```





