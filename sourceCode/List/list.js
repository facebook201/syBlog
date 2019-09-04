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



/**
 * 双向链表
 */

