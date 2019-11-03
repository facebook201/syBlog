# BinaryTree 二叉树

二叉树是一种更为典型的树状结构。子树通常被称为左树和右树。

## 二叉树
每个节点最多只有两个子节点 左侧子节点小于当前节点、右侧子节点大于当前节点。 二叉查找树应该具有的方法：

```tips
add: 向树中插入一个节点
findMin: 查找最小的节点
findMax: 查找最大的节点
find: 查找书中的某个节点
isPresent: 判断某个节点在树中是否存在
remove: 移除树中的某个节点
```

二叉查找树的实现
```javascript
class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  addNode(v) {
    this.root = this.addChild(this.root, v);
  }
  // 添加节点比较当前节点值和当前节点值的大小
  addChild(node, v) {
    if (!node) {
      this.size++;
      return new Node(v);
    }
    if (node.value < v) {
      node.right = this.addChild(node.right, v);
    } else if (node.value > v) {
      node.left = this.addChild(node.left, v);
    }
    return node;
  }
}

const BTree = new BST();

BTree.addNode(5);
BTree.addNode(2);
BTree.addNode(9);
BTree.addNode(7);
BTree.addNode(11);

console.log(BTree);
```



## DFS 深度优先搜索

:::tip 深度优先搜索
DFS 是一种用于遍历或搜索树或图的算法。 沿着树的深度遍历树的节点。尽可能的搜索树的分支。当节点V的所在变都已被探寻过。搜索将回溯到发现节点V的那条边的起始节点。
:::



:::tip leetcode104题 返回二叉树的最大深度
给定一个二叉树，找出其最大深度。
二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
说明: 叶子节点是指没有子节点的节点。
:::


* 首先将根节点放到栈里
* 从栈中取出最后一个节点 检验是否是当前分支最远叶子节点。
* 如果找到目标 结束搜索并回传结果
* 否则将它所有尚未检验过的直接子节点添加到栈中
* 若栈为空 表示整个图都检查过

```javascript
const maxDepth = function (root) {
  if (!root) return 0;

  let depth = 0;
  const stack = [];
  stack.push({ depth, root});

  while (stack.length > 0) {
    const item = stack.pop();
    let currentDepth = item.depth;

    root = item.root;
    depth = Math.max(depth, currentDepth);

    if (root) {
      stack.push({ depth: currentDepth + 1, root: root.left });
      stack.push({ depth: currentDepth + 1, root: root.right });
    }
  }
  return depth;
}
```



- DFS 递归形式 用到了栈先进后出

- BFS 队列 先进先出


## BFS 广度优先搜索

:::tip (Breadth-First-Search，缩写为BFS). BFS是从根节点开始，沿着树的宽度遍历树的节点。如果所有节点均被访问，算法终止。广度优先旨在面临一个路口时 把所有的岔路都记下来，然后选择其中一个进入，然后将它的分路情况记录下来 然后再返回来进入另一个，重复这样操作。 把所有的路径求出来。所以广度优先是逐步求解的，反复的进入与退出，DFS是递归和回溯。
:::

实现方法：

- 首先将根节点放入队列
- 从队列中取出第一个节点 检验它是否已经是当前分支最远的叶子节点。
- 如果找到目标 则结束搜索并返回结果
- 否则将它所有尚未检验过的直接子节点加入到队列中
- 若队列为空 表示整张图都检查过了

![border](https://github.com/facebook201/sy-fontend-system/blob/master/img/BFS.jpeg?raw=true)

```javascript
const maxDepth = function(root) {
  if (!root) return 0;

  let depth = 0;
  const queue = [];
  queue.push({ depth, root });

  while (queue.length > 0) {
    const item = queue.shift();
    const currentDepth = item.depth;

    root = item.root;
    depth = Math.max(depth, currentDepth);

    if (root) {
      queue.push({ depth: currentDepth + 1, root: root.left });
      queue.push({ depth: currentDepth + 1, root: root.right });
    }
  }
  return depth;
};
```

## 前序、中序、后序遍历

![border](https://gitee.com/syomm/blog-img/raw/master/img/binarytree.png)


* 前序遍历 A-B-D-F-G-H-I-E-C
* 中序遍历 F-D-H-G-I-B-E-A-C
* 后序遍历 F-H-I-G-D-E-B-C-A

### 前序遍历

给定一个二叉树，返回它的前序遍历

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  // 函数本身也是一个特殊的对象 所以可以在内部定义局部变量和函数
  let stack = [];
  function pushRoot(node) {
    if (node !== null) {
      stack.push(node.val);
      
      if (node.left !== null) {
        pushRoot(node.left);
      }
      
      if (node.right !== null) {
        pushRoot(node.right);
      }
    }
  }

  pushRoot(root);
  return stack;  
};
```
