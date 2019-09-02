

# 栈 队列 链表



## 栈 Stack

![栈结构](https://pic1.zhimg.com/v2-5dd7d6df8d3d1485dd5a790c8d7044f0_b.jpg)

定义: 

1、后进先出 LIFO。这就是典型的栈结构

2、新添加的或待删除的元素都保存在栈的末尾 栈顶 另一端就叫栈底

3、在栈里，新元素都靠近栈顶 旧元素都是靠近栈底

4、在栈的操作特性来看 是一种操作受限的线性表，只允许在一端插入和删除数据

5、不包含任何元素的栈是空栈



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
  getMin() {
    return Math.min.apply(null, this.stack);
  }
  getMax() {
    return Math.max.apply(null, this.stack);
    // return Math.max(...this.stack); // E6
  }
}
```

上面就是一个基本的栈。
LeetCode上第20题就有相关的栈的应用。































## 队列

![队列](https://pic2.zhimg.com/v2-c7a81170a96c852e1f28a5b2c4905d2d_b.jpg)



## 链表
![链表](https://pic1.zhimg.com/v2-b27814c697c861be8fe8eca9ffc6c174_b.jpg)


* 单链表
* 双链表
* 循环链表
* 非循环链表

#### 数组和链表的区别

数组和链表都是线性表，所有的数据都排列在一个维度上。

* 数组是占用内存上一块连续的内存区，链表在内存中是连续的物理存储，但是链表是分散的，是用指针联系起来的。
* 数组访问元素是 随机访问，链表是 顺序访问
* 数组增加一个元素，会把那个节点后面的元素都会向后面移动一位，链表只需要改变指针就可以，改写局部数据。

**在删除某个元素之前，首先会找到待删除的元素，所以无论是单链表还是数据，复杂度都是O(n),找到删除的元素之后，进行删除操作 链表可以将待删除的节点的前继节点next指针直接指向待删除元素的后续节点即可，时间复杂度是O(1)，数组需要移动数据**



链表是离散分布存储的，N个节点离散分配，彼此通过指针相连，每个节点只有一个前驱节点，每个节点只有一个后续节点。首节点没有前驱，末节点没有后续节点。



#### 节点Node

```javascript
function Node(value) {
  this.value = value;
  this.next = null;
}
```



#### 添加

* 找到要添加的节点，初始化新节点current。

  ![border](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/08/05/screen-shot-2018-04-25-at-163224.png)

* 将当前的current的next指向prev的下一个节点

  ![](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/04/26/screen-shot-2018-04-25-at-163234.png)

* 将找到的prev的next链接到 current节点

![border](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/04/26/screen-shot-2018-04-25-at-163243.png)

```javascript
/**
 * head节点的next属性初始化是null 只有新元素插入才会指向新的元素
 */
class LinkList {
  constructor() {
    this.head = new Node('head');
  }
  // 遍历链表查找给定数据 返回找到的数据节点
  find(item) {
    let currentNode = this.head;
    while(currentNode.value != item) {
      currentNode = currentNode.next;
    }
    // 找到了就返回 找不到就返回null
    return currentNode;
  }
  insert(newValue, item) {
    let newNode = new Node(newValue);
    let currentNode = this.find(item);
    
    newNode.next = currentNode.next;
    currentNode.next = newNode;
  }
}
```











































