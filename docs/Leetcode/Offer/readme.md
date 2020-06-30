# 数组相关

## 03 数组重复数字

> 题目描述
在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。


### 解题思路

**解法一、可以利用set来保存数组里面的元素，如果不存在，我们就把元素add进去，存在就返回那个元素即可。时间复杂度空间复杂度都是 O(N)**

```typescript
function findRepeatValue(nums: number[]): number {
  let set = new Set();
  for (let num of nums) {
    if (set.has(num)) {
      return num;
    } else {
      set.add(num);
    }
  }
  return -1;
}
```

**解法二、题目中说明了所有数字都在 n-1范围内，所以都在这个盒子里。所以可以结合鸽巢原理。原地交换位置，可以将见到的元素 放到索引的位置，如果交换时，发现索引处已存在该元素，则重复。时间复杂度 O(N), 空间复杂度O(1)**

```typescript
function findRepeatValue(nums: number[]): number {
  for (let i = 0; i < nums.length; ++ i) {
    let num = nums[i];
    // 如果当前元素跟索引相同不用替换位置
    while (num !== i) {
      // num索引已经有元素了，重复了
      if (num === nums[num]) return num;
      [nums[i], nums[num]] = [nums[num], nums[i]];
    }
  }
  return -1;
}
```

## 04 二维数组查找

> 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

** 解法：线性查找，由于给定的二维数组具备每行从左到右递增以及每列从上到下递增的特点，当访问到一个元素时，可以排除数组中的部分元素。从二维数组的右上角开始查找。如果当前元素等于目标值，则返回 true。如果当前元素大于目标值，则移到左边一列。如果当前元素小于目标值，则移到下边一行**

```js
/**
// 如下矩阵
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
*/
function findNumberIn2DArray(matrix, target) {
  if (matrix == null || matrix.length == 0) {
    return false;
  }
  let m = matrix.length, n = matrix[0].length;
  let row = 0, column = n - 1;
  while (row < m && column >= 0) {
    if (matrix[row][column] === target) return true;
    if (matrix[row][column] < target) {
      row++;
    } else if (matrix[row][column] > target) {
      column--;
    }
  }
  return false;
}
```
