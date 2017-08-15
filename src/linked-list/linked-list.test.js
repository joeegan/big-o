import LinkedList from './linked-list'

const range = (min, max) => {
  const arr = []
  for (let i = min; i <= max; i++) {
    arr.push(i)
  }
  return arr
}

test('prev and next references are available', () => {
  const ll = new LinkedList(1, 2, 3)
  expect(ll.head.value).toEqual(1)
  expect(ll.head.next.value).toEqual(2)
  expect(ll.head.prev).toEqual(null)
  expect(ll.tail.next).toEqual(null)
  expect(ll.tail.prev.value).toEqual(2)
  expect(ll.head.next.next.value).toEqual(3)
  expect(ll.head.next.prev.value).toEqual(1)
  expect(ll.head.next.next.prev.value).toEqual(2)
})

test('longer list', () => {
  const ll = new LinkedList(...range(0, 99))
  expect(ll.head.value).toEqual(0)
  expect(ll.head.next.value).toEqual(1)
  expect(ll.tail.value).toEqual(99)
  expect(ll.tail.prev.value).toEqual(98)
})
