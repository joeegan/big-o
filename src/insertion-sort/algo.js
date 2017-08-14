import Events from 'backbone-events-standalone'

export const emitter = {}
_.extend(emitter, Events)
const emit = _.partial(emitter.trigger.bind(emitter), 'msg')

export default function insertionSort(arr) {
  for (var end = 1; end < arr.length; end++) {
    for (var i = end; i >= 0; i--) {
      var current = arr[i]
      for (var j = i - 1; j >= 0; j--) {
        var comparator = arr[j]
        emit(`comparing ${current} > ${comparator}`, {
          arr: arr.slice(),
          current: i,
          comparator: j,
        })
        if (current > comparator) {
          arr[j + 1] = current
          break
        }
        arr[j + 1] = comparator
        if (j === 0) {
          arr[j] = current
          break
        }
      }
    }
  }

  return { arr }
}
