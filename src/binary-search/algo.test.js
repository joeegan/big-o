import binarySearch from './algo'

test('finds the index of a target value in a sorted array', () => {
  expect(
    binarySearch(8, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).index
  ).toEqual(7)
})
test('finds the index of a target value in non linear array', () => {
  expect(
    binarySearch(300, [1, 20, 300, 400]).index
  ).toEqual(2)
})
test('returns null if target value not present in the array', () => {
  expect(
    binarySearch(300, [1, 20, 100, 400]).index
  ).toEqual(null)
})
test('returns null if array is empty', () => {
  expect(binarySearch(300, []).index).toEqual(null)
})
