import quickSort from './algo'

test('sorts numeric', () => {
  expect(quickSort([10,9,8,7,6,5,4,3,2,1]).arr).toEqual([1,2,3,4,5,6,7,8,9,10]);
});
