import _ from 'lodash'
import Events from 'backbone-events-standalone'

function swap(indexA, indexB, arr) {
  const aValue = arr[indexA]
  arr[indexA] = arr[indexB]
  arr[indexB] = aValue
}

export const emitter = {}
_.extend(emitter, Events)
const emit = _.partial(emitter.trigger.bind(emitter), 'msg')

export default function selectionSort(
  arr,
  iterationCount = 1
) {
  for (let i = 0; i < arr.length; i++) {
    const currentValue = arr[i]
    let smallest
    for (
      let candidate = i + 1;
      candidate < arr.length;
      candidate++
    ) {
      iterationCount++
      const candidateValue = arr[candidate]
      if (smallest) {
        if (candidateValue < arr[smallest]) {
          smallest = candidate
        }
      } else if (candidateValue < currentValue) {
        smallest = candidate
      }
      emit('smallest', {
        arr: arr.slice(),
        currentIndex: i,
        smallest,
        candidate,
      })
    }
    if (smallest) {
      swap(i, smallest, arr)
    }
  }
  emit('finished', { arr })
  return { arr, iterationCount }
}
