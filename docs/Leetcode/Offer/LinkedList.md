
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

```javascript
	// 快慢指针来确定相遇的节点
	let fast = pHead;
	let slow = pHead;

	// 快慢指针相等
	while (fast && slow.next) {
		fast = fast.next.next;
		slow = slow.next;
		// 比较两者的值
		if (fast.value === slow.value) {
			break;
		}
	}

	// 然后重置快指针 到头节点 然后同时向前移动 相遇的地方就是环的入口节点
	fast = pHead;
	// 依次移动一位
	while (fast.value !== slow.value) {
		fast = fast.next;
		slow = slow.next;
	}
	return slow;
```

> 6、链表中倒数最后k个结点

第一个指针先移动k步，然后第二个指针再从头开始，这个时候这两个指针同时移动，当第一个指针到链表的末尾的时候，返回第二个指针即可

```javascript
function FindKthToTail(pHead, k) {
  let fast = pHead;
	let slow = pHead;
	let i = 0;

	while (fast) {
		// k == 0 全部返回
		if (i == k) break;
		fast = fast.next;
		i++;
	}
	// 超过边界
  if (i < k) {
    return fast;
  }

	while (fast) {
		fast = fast.next;
		slow = slow.next;
	}

	return slow;
}
```

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

* 初始化：快指针fast指向头结点， 慢指针slow指向头结点
* 让fast一次走两步， slow一次走一步，第一次相遇在C处，停止
* 然后让fast指向头结点，slow原地不动，让后fast，slow每次走一步

![border](https://uploadfiles.nowcoder.com/images/20200422/284295_1587553517754_3DCB951FEBF0807DCA2148EC373574F2)

```javascript
// 判断链表是否有环 而且找出入口的节点
function EntryNodeOfLoop(pHead) {
	// 快慢指针来确定相遇的节点
	let fast = pHead;
	let slow = pHead;

	// 快慢指针相等
	while (fast && slow.next) {
		fast = fast.next.next;
		slow = slow.next;
		// 比较两者的值
		if (fast.value === slow.value) {
			break;
		}
	}

	// 然后重置快指针 到头节点 然后同时向前移动 相遇的地方就是环的入口节点
	fast = pHead;
	// 依次移动一位
	while (fast.value !== slow.value) {
		fast = fast.next;
		slow = slow.next;
	}
	return slow;
}
```


> 6、输入一个长度为 n 的链表，设链表中的元素的值为 ai ，返回该链表中倒数第k个节点。如果该链表长度小于k，请返回一个长度为 0 的链表。




