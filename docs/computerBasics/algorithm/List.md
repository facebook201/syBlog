

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



#### 特点

* **链表是通过指针将零散的内存块串连起来** 所以链表不支持随机访问，如果要找特定的项，只能从开头开始遍历 直到找到，所以访问的时间复杂度是 O(n)

* **高效的插入和删除** 链表中插入或删除一个数据  我们并不需要为了保护连续性来搬移节点。因为链表的存储空间本身就是不连续的。只需要考虑相邻节点的指针改变，所以速度很快 时间复杂度 O（1）

  

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



### 设计链表

单链表中的节点应该有两个属性：val和next。val是当前节点的值，next是指向下一个节点的指针/引用。

如果要使用双向链表，则还需要一个属性prev以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。



### 单向链表

因为链表的头部增加节点有点麻烦 所以初始化都会建好头节点。head。表示链表的头部。



#### 实现

* Node类表示节点
* LinkedList 类提供插入节点、删除的一些操作

单向链表的常用操作：

* append(element)：尾部添加元素

* insert(position, element)：特定位置插入一个新的项

* removeAt（position）：特定位置移除一项

* remove(element)：移除一项

* indexOf(element): 返回元素在链表中的索引。如果链表中没有该元素 则返回-1

* isEmpty() 如果链表中没有元素就返回true，如果长度大于0 返回false

* size（）返回链表包含的元素个数

* getHead（）返回链表的第一个元素

* toString（）输出元素的值

  

```javascript
/**
 * 单向链表
 * */
function LinkedList() {
  // 节点
  function Node(element) {
    this.element = element;
    this.next = null;
  }

  this.length = 0; // 链表的长度
  var head = null; // 链表的头部

  // 向链表尾部添加一个元素
  this.append = function(element) {
    var node = new Node(element);
    var currentNode = head;

    if (head === null) {
      head = node;
    } else {
      // 如果当前节点不为空 就一直找下去
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      // 把当前节点的next指针指向 node
      currentNode.next = node;
    }
    this.length++;
  }

  // 从链表的特定位置移除一项
  this.insert = function(position, element) {
    // 越界就不考虑
    if (position < 0 || position > length) return false;

    var node = new Node(element); // 要新增的节点
    var index = 0;
    var currentNode = head;
    var previousNode;

    if (position === 0) {
      // 如果是第一个那么就把node的next指向head 同时把初始化的head改成node
      node.next = currentNode;
      head = node;
    } else {
      while (index < position) {
        index++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = node;
      node.next = currentNode;
    }
    this.length++;
    return true;
  }
  
  // 删除指定位置的元素
  this.removeAt = function(position) {
    if (length === 0) return false; 
    if (position < 0 && position >= length) return false;

    var currentNode = head;
    var index = 0;
    var previousNode;

    if (position === 0) {
      head = currentNode.next;
    } else {
      while(index < position) {
        index++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      // 这里就相当于 把第 n 节点的next指向 n+1的下一个节点 就是 n+2 这样 n+1的节点就给删除了
      previousNode.next = currentNode.next;
      // 删除之后就长度减去1
      this.length--;
      return true;
    }
  };

  // 删除指定的元素
  this.remove = function(element) {
    var index = this.indexOf(element);
    if (index > -1) {
      return this.removeAt(index);
    }
  };

  // 返回元素在链表的索引，如果链表没有该元素就返回-1
  this.indexOf = function(element) {
    if (length === 0) return -1;
    var currentNode = head;
    var index = 0;
    
    // 注意理解一下 判断Node的元素是否相等来判断这个
    while (currentNode) {
      if (currentNode.element === element) {
        return index;
      }
      index++;
      currentNode = currentNode.next;
    }
    return -1;
  };

  // 是否包含元素
  this.isEmpty = function() {
    return this.length === 0;
  };

  // 返回链表包含的元素个数
  this.size = function() {
    return this.length;
  };

  // 获取链表头部元素
  this.getHead = function() {
    return head.element;
  };

  this.toString = function() {
    var currentNode = head;
    var string = '';

    while (currentNode) {
      string += ',' + currentNode.element;
      currentNode = currentNode.next;
    }
    // 去掉第一个,
    return string.slice(1);
  };

  this.list = function() {
    console.log('head', head);
    return head;
  }
}

var linklist = new LinkedList();


linklist.append('Tom');
linklist.append('Peter');

linklist.list();
// Node { element: 'Tom', next: Node { element: 'Peter', next: null } 
```

单链表的数据类似对象。实际上是Node类生成的实例。



### 双向链表

双向链表有两个方向，每个节点不止有一个后继指针next指向后面的节点，还有一个前驱指针prev指向前面的节点。



#### 单向链表和双向链表的比较

* 双向链表需要额外的两个空间来存储前驱和后继节点的地址。所以要占用更多的内存空间
* 双向链表提供了两种迭代列表的方法：从头到尾，或者从尾到头。我们可以访问一个特定节点的下一个或前一个元素
* 单向链表中 如果迭代链表时错过了要找的元素 就要回到起点 重新开始迭代。
* 双向链表中 可以从任一节点 向前或者向后迭代 这是双向链表的优点
* 双向链表可以支持O(1)时间复杂度情况找到前驱节点。



### 循环列表
循环列表跟单链表很相似，只不过唯一的区别是 循环链表的尾部指向头节点。
![border](https://camo.githubusercontent.com/659c8cc5af2c116e00158320119bd39b3852f537/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d396563356532386238376430643134342e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

环形链表从任意一个节点开始 都可以循环整个链表。

```javascript

function CircleLinkedList() {
  function Node(elemnent) {
    this.elemnent = elemnent;
    this.next = null;
  }

  this.length = 0;
  var head = null;

  this.append = function(elemnent) {
    var node = new Node(elemnent);
    var currentNode;

    if (head === null) {
      head = node;
      // 循环链表 开始会把头的指针指向自己
      node.next = head;
    } else {
      currentNode = head;
      // 如果不等于自己
      while (currentNode.next !== head) {
        currentNode = currentNode.next;
      }
      // 直到找到最后一个然后添加 node 再把node的next指向head
      currentNode.next = node;
      node.next = head;
    }
    this.length++;
    return true;
  };

  this.insert = function(position, element) {
    if (position > -1 && position < this.length) {
      var node = new Node(element);

      var index = 0;
      var currentNode = head;
      var previous;

      if (position === 0) {
        node.next = head;
        // 因为插入的开头 所以 head要替换成node
        head = node;
      } else {
        while (index < position) {
          previous = currentNode;
          currentNode = currentNode.next;
        }
        previous.next = node;
        node.next = currentNode;
        this.length++;
        return true;
      }
    } else {
      return false;
    }
  };

  this.removeAt = function(position, element) {

  };

  this.remove = function(element) {
    var current = head;
  };

  this.indexOf = function() {

  };

  this.toString = function() {
    
  };

  this.getHead = function() {
    return head.element;
  };

  this.list = function() {
    console.log(head);
  }
}

var list = new CircleLinkedList();

list.append('TOM');
list.append('Peter');
list.append('2');
list.append('4');
list.insert(0, 'Insert');

list.list();

```


* 链表的代码到处都是指针的操作，边界条件的处理。所以要很小心
* 链表代码可以看出一个人的代码功底。是否细心 是否考虑问题全面 是否思维缜密



































