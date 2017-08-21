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

test('unshift adds to the beginning of the list', () => {
  const ll = new LinkedList(1, 2, 3)
  ll.unshift(0)
  expect(ll.head.value).toEqual(0)
})

test('toArray creates an array with the values', () => {
  const ll = new LinkedList(1, 2, 3)
  ll.unshift('foo')
  ll.push('bar')
  expect(ll.toArray()).toEqual(['foo', 1, 2, 3, 'bar'])
})

test('forEach reveals all values', () => {
  expect.assertions(3)
  const ll = new LinkedList(1, 2, 3)
  ll.forEach((v, i) => {
    expect(v).toEqual(i + 1)
  })
})

test('pop removes the last element', () => {
  const ll = new LinkedList(1, 2, 3)
  ll.pop()
  expect(ll.toArray()).toEqual([1, 2])
  ll.pop()
  expect(ll.toArray()).toEqual([1])
  ll.pop()
  expect(ll.toArray()).toEqual([])
})
