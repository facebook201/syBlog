
## 剑指Offer 链表

> 1、输入一个链表的头节点，按链表从尾到头的顺序返回每个节点的值（用数组返回）。如输入 { 1, 2, 3 } 返回一个数组为[3,2,1]

```ts
function printListFromTailToHead(head) {
    if (!head) return [];
    const result = [];

    // 遍历链表 
    while (head) {
        result.unshift(head.val);
        head = head.next;
    }
    return result;
}
```

> 2、反转链表 给定一个单链表的头结点pHead，长度为n，反转该链表后，返回新链表的表头。 如当输入链表{1,2,3}时，经反转后，原链表变为{3,2,1}，所以对应的输出为{3,2,1}。

```javascript
function reverseList(head) {
    let cur = head;
    let next = null;
    let prev = null;

    while (cur) {
        // 下一个节点执行 B C D
        next = cur.next;
        // A 指向 null;
        cur.next = prev;
        // prev 前面节点移一位
        prev = cur;
        // cur 置位 到 B
        cur = next;
    }
}
```
> 3、输入两个递增的链表，单个链表的长度为n，合并这两个链表并使新链表中的节点仍然是递增排序的。
> 数据范围： 0 \le n \le 10000 ≤ n ≤ 1000，-1000 \le 节点值 \le 1000−1000≤节点值≤1000
> 要求：空间复杂度 O(1)，时间复杂度 O(n)
> 如输入 { 1, 3, 5 }, { 2, 4, 6 } 时，合并后的链表为 { 1, 2, 3, 4, 5, 6 }，所以对应的输出为 { 1, 2, 3, 4, 5, 6 }，转换过程如下图所示：


```javascript
function MergeLinkedList(l1, l2) {
	if (!l1 || !l2) return;
	// 重新增加一个 linked 其他的 linked 都慢慢添加到它后面
	let vHead = new Node(-1);
	let cur = vHead;

	// 遍历链表 知道某一个链表全部遍历完
	while (l1 && l2) {
		// 比较链表的值
		if (l1.value <= l2.value) {
			cur.next = l1;
			l1 = l1.next;
		} else {
			cur.next = l2;
			l2 = l2.next;
		}
		cur = cur.next;
	}

	// 看谁还剩下 剩下的都会排到后面去
	cur.netx = l1 ? l1 : l2;
	return vHead.next;
}
```

> 4、输入两个无环的单向链表，找出它们的第一个公共结点，如果没有公共节点则返回空。
>（注意因为传入数据是链表，所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的）

:::tip
第一个公共结点为8，但是链表A头结点到8的长度为2，链表B头结点到8的长度为3，显然不好办？
如果我们能够制造一种理想情况，如下：
A != B;
A + B = B + A;
:::
![border](https://uploadfiles.nowcoder.com/images/20200420/284295_1587394616610_37C15C411477833D2C2325823D927212)
![border](https://uploadfiles.nowcoder.com/files/20210621/908787715_1624289962297/36.gif)


```javascript
// 快慢指针
function FindFirstCommonNode(pHead1, pHead2) {
	let l1 = pHead1;
	let l2 = pHead2;

	// 直到两个元素相等为止
	while (l1.value != l2.value) {
		// 快慢 指针 依次循环 直到两个相等位置
		l1 = (l1.next === null) ? pHead2 : l1.next;
		l2 = (l2.next === null) ? pHead1 : l2.next;
	}
	return l1.value;
}
```

> 5、给一个长度为n链表，若其中包含环，请找出该链表的环的入口结点，否则，返回null。


