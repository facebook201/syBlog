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