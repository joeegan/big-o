export default class LinkedList {
  constructor(...items) {
    this.head = null
    this.tail = null
    items.forEach(item => this.push(item))
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

  unshift(item) {
    this.head = new Node(item, null, this.head)
  }

  forEach(fn) {
    let lens = this.head
    let i = 0
    fn(lens.value, i)
    while (lens.next) {
      lens = lens.next
      i++
      fn(lens.value, i)
    }
  }

  toArray() {
    const arr = []
    this.forEach((v, i) => arr.push(v))
    return arr
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
