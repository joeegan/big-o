import Stack from './stack'

const range = (min, max) => {
  const arr = []
  for (let i = min; i <= max; i++) {
    arr.push(i)
  }
  return arr
}

test('basic operations', () => {
  const stack = new LinkedList(1, 2, 3)
  stack.pop()
  expect(stack.length).toEqual(2)
  stack.push(3)
  expect(stack.length).toEqual(2)
})
