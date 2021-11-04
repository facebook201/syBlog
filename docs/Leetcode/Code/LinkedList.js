// 节点构造函数
function Node(val) {
    this.next = null;
    this.prev = null;
    this.value = val;
}

function LinkedList() {
    this.head = null;
    this.length = 0;
}

LinkedList.prototype.append = function(ele) {
    const node = new Node(n);
    if (this.head === null) {
        this.head = node;
    } else {
        let currentNode = this.head;
        while (currentNode.next) {
            currentNode = currentNode.next;
        }
        currentNode.next = node;
    }    
    this.length++;
};

LinkedList.prototype.find = function(n) {}

LinkedList.prototype.insertNode = function(n, index) {
    if (index < 0 || index > this.length) return false; 
};

const linkNode = new LinkedList();

linkNode.append('A');
linkNode.append('B');
linkNode.append('C');
linkNode.append('D');

// * 剑指 offer 1、输入一个链表的头节点，按链表从尾到头的顺序返回每个节点的值（用数组返回）。
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

// A ——> B ——> C ——> D

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

reverseList(linkNode.head);

// 合并链表
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

// 输入两个无环的单向链表，找出它们的第一个公共结点
// 快慢指针
function FindFirstCommonNode(pHead1, pHead2) {
	let l1 = pHead1;
	let l2 = pHead2;

	// 直到两个元素相等为止
	while (l1.value != l2.value) {
		// 快慢 指针 依次循环 然后加上对方的链表长度 保证 最终到 相等节点的路径是一致的
		l1 = (l1.next === null) ? pHead1 : l1.next;
		l2 = (l2.next === null) ? pHead2 : l2.next;
	}
	return l1.value;
}


function EntryNodeOfLoop(pHead) {

}