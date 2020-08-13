<!--
 * @Author: shiyao
 * @Description: 树 数据结构
 * @Date: 2019-08-28 12:38:43
 -->
# Tree 树 

**快速学习一个非常重要的策略就是，对繁杂的知识，进行统一划归，并进一步简化，去伪存真。因为除非你是智力超群的那一撮人，大部分人学习慢都是因为被杂乱的知识扰乱了精力，任何一种知识，只要你能抓最主要的矛盾，掌握最核心的概念，你就能快速学习。这也是在硅谷大热的“第一性原理”（据说 Elon Musk 是第一性原理的超级信徒）。**

> ★ “每个系统中存在一个最基本的命题，它不能被违背或删除。” -- 亚里士多德 ”

树是一种经常用到的数据结构。树的每一个节点有一个根植和一个包含所有子节点的列表，从图上来看，数也可视为一个拥有N个节点和N-1条边的一个有向无环图。

## 树和图的核心知识点

* 深度优先遍历（DFS）
* 广度优先遍历（BFS）
* 前序遍历 (其实就是DFS) 先访问根节点、遍历左子树、最后右子树
* 中序遍历 (中序遍历是先遍历左子树，然后访问根节点，然后遍历右子树。)
* 后序遍历（后序遍历是先遍历左子树，然后遍历右子树，最后访问树的根节点。）

### 总结

深度优先：以中序遍历为例，某个节点被访问，左子树一定全部被访问，右子树一定没有被访问。
广度优先：从根节点开始 访问顺序一定是按照层级深度递增的。

## Tree 的基本概念
Tree 数据结构和自然界中的树及其相似，有根、树枝、叶子。如上图 Tree是一种多层数据结构，与Array、Stack、Queue相比是一种非线性的数据结构， 在进行插入和搜索操作时很高效。

* Root：代表树的根节点 根节点没有父节点
* Parent Node：父节点 一个节点的直接上级节点 只有一个
* Child Node ： 子节点 一个节点的直接下级节点 可能有多个
* Siblings ：兄弟节点 具有相同父节点的节点
* Leaf(叶节点)：没有子节点的节点
* Efge(边)：两个节点之间的连接线
* Path（路径）：从源节点到目标节点的连续边
* Height of Node (节点的高度)：表示节点与叶节点之间的最长路径上边的个数
* Height of Tree (树的高度)：根节点的高度
* Depth of Node (节点的深度)：表示从根节点到该节点的边的个数
* Degree of Node（节点的度）：表示子节点的个数



## 树与图

> **树其实是图的一种特殊情况，图有两种遍历方式，深度优先遍历（DFS）和广度优先遍历（BFS）**

![border](https://pic2.zhimg.com/v2-a8499f299716cef37b992a1b38b244f6_b.webp)

### DFS 遍历使用递归

> DFS 遍历代码简洁，递归的方式其实隐含了栈 不需要自己维护一套数据结构。

```javascript
function DFS(root) {
  if (!root) return;
  let stack = [];

  // 递归方式 每个递归都可以改写成迭代
  preorderTraversal(root);
  
  function preorderTraversal(root) {
    stack.push(root.value);
    if (root.left !== null) {
      preorderTraversal(root.left);
    }
    if (root.right !== null) {
      preorderTraversal(root.right);
    }
  }
  console.log(stack);
}

// 迭代的方式
function DFSIter(root) {
  if (!root) return;
  let stack = [];
  let result = [];

  stack.push(root);

  while (stack.length > 0) {
    let item = stack.pop();
    result.push(item.value);

    // 先入右节点 先进后出
    if (item.right != null) {
      stack.push(item.right);
    }
    if (item.left != null) {
      stack.push(item.left);
    }
  }
  return result;
}
```



### BFS 遍历使用队列数据结构

> BFS 适合用来解 【层序遍历】、【最短路径】
>
> 回其按层序遍历得到的节点值。层序遍历即逐层地、从左到右访问所有结点。



## 层序遍历

**层序遍历简单来说是把二叉树分层，然后每一层从左到右遍历：**

![border](https://picb.zhimg.com/80/v2-04645498d886166e82fdc46779e262bd_720w.jpg)



结合入栈和出栈的过程

![border](https://pic2.zhimg.com/80/v2-0c3a851199c97535bacfee1807e7ab67_720w.jpg)

```javascript
function BFS(root) {
  if (!root) return;

  let queue = [];
  let depth = 0;
  queue.push({ root, depth });

  // 先进先出原则 直到队列空为止
  while(queue.length > 0) {
    // 出栈
    let item = queue.shift();
    let root = item.root;

    // 记录上一层的层级深度 如果继续入栈的话 需要加1
    let currentDepth = item.depth;
    // 取较大的depth
    depth = Math.max(depth, currentDepth);
    
    if (root.left !== null) {
      queue.push({ root: root.left, depth: currentDepth + 1 });
    }
    if (root.right !== null) {
      queue.push({ root: root.right, depth: currentDepth + 1 });
    }
  }
  return depth;
}
```





## 前序遍历



## 中序遍历





## 后序遍历













