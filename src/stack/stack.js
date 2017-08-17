import LinkedList from './linked-list'

export default class Stack {
  constructor(items) {
    this.list = new LinkedList(items)
  }
  push(item) {
    this.list.push(item)
  }
  pop() {
    delete this.list.tail
  }
}
