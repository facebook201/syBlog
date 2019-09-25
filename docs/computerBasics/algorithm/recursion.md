
# 递归

## 递归的概念
简单来说，递归就是自己调用自己，它会把问题拆为子问题。递归调用继续进行，直到子问题无需进一步递归就可以解决的地步。


## 示例

> 以相反的顺序打印字符串


如果使用迭代可以很简单的解决，怎么使用递归呢？

* 定义函数 printReverse(str, index) 参数分别是字符和字符的某个位置。
* 找到终结点, str为空值 或者 index > length 长度

```javascript
let str = 'hello world';

funtion printReverse(str, index) {
  if (str == null || index > length) {
    return;
  }
  // 没有到终止条件 就一直调用自己
  printReverse(str, index + 1)
  console.log(str[index]);
}
```




