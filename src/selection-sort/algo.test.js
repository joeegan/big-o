import selectionSort from './algo'

test('sorts numeric', () => {
  expect(selectionSort([10,9,8,7,6,5,4,3,2,1]).arr).toEqual([1,2,3,4,5,6,7,8,9,10]);
});
test('handles duplicates', () => {
  expect(selectionSort([10,9,9,8,7,7,6,5,5,4,3,2,1]).arr).toEqual([1,2,3,4,5,5,6,7,7,8,9,9,10]);
});
test('handles negatives', () => {
  expect(selectionSort([1,-1,0,2]).arr).toEqual([-1,0,1,2]);
});
test('handles assortment', () => {
  expect(selectionSort([1,-1000,0.123,2]).arr).toEqual([-1000,0.123,1,2]);
});
