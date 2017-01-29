import _ from 'lodash';
import Events from 'backbone-events-standalone';

export const emitter = {};
_.extend(emitter, Events);
const emit = _.partial(emitter.trigger.bind(emitter), 'msg');

/*
 * @param {number} target The Value in the array we wish to find the index of
 * @param {number[]} arr The ordered list of numbers
 * @param {number} [min] Lowest index to check in the array
 * @param {number} [max] Highest index to check in the array
 * @returns {number} The index of the target
 */
export default function binarySearch(target, arr, min=0, max=arr.length-1, iterationCount=1) {
  const indexesOfInterest = _.range(min, max + 1);
  const guessIndex = Math.floor((max + min) / 2);
  const guessValue = arr[guessIndex];

  emit(`Looking at indexes ${min} to ${max}, guessing at the midpoint index ${guessIndex}`, target, guessIndex, guessValue, indexesOfInterest);

  if (guessValue === target) {
    emit(`Success! The target ${target} was found at index ${arr.indexOf(target)}`, target, guessIndex, guessValue, indexesOfInterest);
    return {
      index: arr.indexOf(target),
      iterationCount,
    }
  }

  if (max === 0 || max == 1
  || (indexesOfInterest.length === 1 && guessValue !== target)) {
    // it's not in the array
    return {
      index: null,
      iterationCount,
    }
  }

  if (guessValue < target) {
    min = guessIndex + 1;
    emit(`The guess (${guessValue}) was less than the target (${target}), increasing min to index ${min}`, target, guessIndex, guessValue, indexesOfInterest);
  } else { // guess > target
    max = guessIndex - 1;
    emit(`The guess (${guessValue}) was more than the target (${target}), lowering max to index ${max}`, target, guessIndex, guessValue, indexesOfInterest);
  }
  iterationCount++;
  return binarySearch(target, arr, min, max, iterationCount);
}
