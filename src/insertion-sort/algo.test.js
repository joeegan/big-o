import insertionSort from './algo';
import _ from 'lodash';

test('sorts numeric', () => {
  expect(insertionSort([10,9,8,7,6,5,4,3,2,1]).arr).toEqual([1,2,3,4,5,6,7,8,9,10]);
});

test('variety', () => {
  var arr = [2,1,9,2,3,11,100,-19,11,-100000,50000,1.2,60,60];
  var copy = arr.slice().sort((a, b) => a - b);
  expect(insertionSort(arr).arr).toEqual(copy);
})

test('large range', () => {
  var arr = _.range(400).map(() => _.random(400));
  var copy = arr.slice().sort((a, b) => a - b);
  expect(insertionSort(arr).arr).toEqual(copy);
})
