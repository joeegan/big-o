export default class LinkedList {
  constructor(...items) {
    this.head = null
    this.tail = null
    items.forEach(item => {
      this.push(item)
    })
  }

  push(item) {
    if (!this.head) {
      this.head = new Node(item, null, null)
    } else if (!this.tail) {
      this.tail = new Node(item, this.head, null)
    } else {
      this.tail = new Node(item, this.tail, null)
    }
  }
}

class Node {
  constructor(item, previousNode, nextNode) {
    this.value = item
    this.next = nextNode
    this.prev = previousNode
    if (previousNode) {
      previousNode.next = this
    }
    if (nextNode) {
      nextNode.prev = this
    }
  }
}
