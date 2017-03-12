import quickSort from './quick-sort/algo'
import insertionSort from './insertion-sort/algo'
import selectionSort from './selection-sort/algo'
import _ from 'lodash'

const jsSort = arr => arr.slice().sort((a, b) => a - b);

const testCases = [
  [
    'numeric',
    [10,9,8,7,6,5,4,3,2,1],
  ],
  [
    'duplicates',
    [10,9,9,8,7,7,6,5,5,4,3,2,1],
  ],
  [
    'negatives',
    [1,-1,0,2],
  ],
  [
    'variety',
    [2,1,9,2,3,11,100,-19,11,-100000,50000,1.2,60,60],
  ],
  [
    'large range',
    _.range(400).map(() => _.random(400)),
  ],
]
const sorts = [quickSort, insertionSort, selectionSort];
sorts.forEach(sort => {
  testCases.forEach(([name, arr]) => {
    test(`${sort.name} ${name}`, () => {
      expect(sort(arr).arr).toEqual(jsSort(arr));
    })
  })
});
