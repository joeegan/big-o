import _ from 'lodash'
import Events from 'backbone-events-standalone'

export const emitter = {}
_.extend(emitter, Events)
let emit = _.partial(emitter.trigger.bind(emitter), 'msg')

/*
 * @param {number} target The Value in the array we wish to find the index of
 * @param {number[]} arr The ordered list of numbers
 * @param {number} [min] Lowest index to check in the array
 * @param {number} [max] Highest index to check in the array
 * @returns {number} The index of the target
 */
export default function binarySearch(
  target,
  array,
  min = 0,
  max = array.length - 1,
  iterationCount = 1
) {
  let indexesOfInterest = _.range(min, max + 1)
  const guessIndex = Math.floor((max + min) / 2)
  const guessValue = array[guessIndex]
  emit = _.partialRight(emit, {
    array,
    target,
    guessIndex,
    guessValue,
    indexesOfInterest,
  })

  if (guessValue === target) {
    emit(
      `Success! The target ${target} was found at index ${array.indexOf(target)}`
    )
    return {
      index: array.indexOf(target),
      iterationCount,
    }
  }

  if (
    max === 0 ||
    max == 1 ||
    (indexesOfInterest.length === 1 &&
      guessValue !== target)
  ) {
    // it's not in the array
    return {
      index: null,
      iterationCount,
    }
  }

  if (guessValue < target) {
    min = guessIndex + 1
    emit(
      `The guess (${guessValue}) was less than the target (${target}), increasing min to index ${min}`
    )
  } else {
    // guess > target
    max = guessIndex - 1
    emit(
      `The guess (${guessValue}) was more than the target (${target}), lowering max to index ${max}`
    )
  }
  iterationCount++
  return binarySearch(
    target,
    array,
    min,
    max,
    iterationCount
  )
}
