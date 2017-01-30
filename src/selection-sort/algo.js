import _ from 'lodash';
import Events from 'backbone-events-standalone';

function swap(indexA, indexB, arr) {
  const aValue = arr[indexA];
  const bValue = arr[indexB];
  // emit('moving', b, 'toIndex', firstIndex);
  arr[indexA] = bValue;
  // emit('moving', a, 'toIndex', secondIndex);
  arr[indexB] = aValue;
  return arr;
}

// export const emitter = {};
// _.extend(emitter, Events);
// let emit = _.partial(emitter.trigger.bind(emitter), 'msg');

export default function selectionSort(arr, iterationCount=1) {
  for (let i = 0; i < arr.length; i++) {
    const currentValue = arr[i];
    let smallest;
    for (let candidate = i + 1; candidate < arr.length; candidate++) {
      iterationCount++;
      const candidateValue = arr[candidate];
      if (smallest) {
        if (candidateValue < arr[smallest]) {
          smallest = candidate;
        }
      } else if (candidateValue < currentValue) {
        smallest = candidate;
      }
    }
    if (smallest) {
      swap(i, smallest, arr);
    }
  }
  return { arr, iterationCount }
}
