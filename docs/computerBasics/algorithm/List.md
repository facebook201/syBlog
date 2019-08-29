

# 栈 队列 链表



## 栈 Stack

![栈结构](https://pic1.zhimg.com/v2-5dd7d6df8d3d1485dd5a790c8d7044f0_b.jpg)

定义: 

1、后进先出 LIFO。这就是典型的栈结构

2、新添加的或待删除的元素都保存在栈的末尾 栈顶 另一端就叫栈底

3、在栈里，新元素都靠近栈顶 旧元素都是靠近栈底





#### 栈的方法

* push(item) ：添加一个或几个元素到栈顶
* isEmpty：查看栈是否是空的
* pop: 删除栈顶的元素
* getSize：返回栈的元素个数
* peek: 返回栈顶的元素 不该原栈



```javascript
class Stack {
  constructor() {
    this.stack = [];
  }
  push(val) {
    this.stack.push(val);
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  pop() {
    this.stack.pop();
  }
  getSize() {
    return this.stack.length;
  }
  peek() {
    return this.stack[this.getSize() - 1];
  }
}
```































## 队列

![队列](https://pic2.zhimg.com/v2-c7a81170a96c852e1f28a5b2c4905d2d_b.jpg)



## 链表

![链表](https://pic1.zhimg.com/v2-b27814c697c861be8fe8eca9ffc6c174_b.jpg)