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

LinkedList.prototype.find = function(n) {

}

LinkedList.prototype.insertNode = function(n, index) {
    if (index < 0 || index > this.length) return false; 
};



