// const emit = () => {}; // TODO
import { green, yellow, blue, red, cyan } from 'chalk'

const emit = console.log

const highlightIndex = (arr, i, j) => {
  return `[${arr.map((n, k) => {
    if (k == i || k == j) {
      return cyan(`${n}`);
    }
    return blue(`${n}`);
  })}]`;
}

const highlightWall = (arr, i) => {
  return `[${arr.map((n, j) => j <= i ? blue(`${n}`) : yellow(`${n}`))}]`;
}

function swap(a, b, arr) {
  const oldClone = arr.slice();
  const firstIndex = arr.indexOf(a);
  const secondIndex = arr.indexOf(b);
  arr[firstIndex] = b;
  // emit('moving', b, 'toIndex', firstIndex, arr);
  arr[secondIndex] = a;
  emit(/* 'swapped', green(b), 'with', yellow(a), */ highlightIndex(oldClone, firstIndex, secondIndex), '->', highlightIndex(arr, firstIndex, secondIndex));
  return arr;
}

export default function quickSort(arr) {

  let iterationCount = 0;

  /*
   * Modifies parts of the arr between low and high
   * @returns {Number} the next pivot location
   */
  function partition(arr, low, high) {
    const pivot = arr[low];
    let leftWall = low;
    for (let i=low + 1; i < high; i++) {
      iterationCount++;
      if (arr[i] <= pivot) {
        // swap it with the element to the right of the wall
        emit('as', green(arr[i]), 'is less than or equal to', green(pivot), '...');
        arr = swap(arr[i], arr[leftWall], arr);
        // move the wall one space to the right
        leftWall++;
        emit('left wall increased to index', green(leftWall), highlightWall(arr, leftWall));
      }
    }
    // Place pivot as the first element on the right of the partitioning wall.
    swap(pivot, arr[leftWall], arr);
    // The leftwall is the returned to reveal the splitting location for the next recurse
    return leftWall;
  }

  function sort(arr, low, high) {
    emit('sorting', blue(arr));
    if (low < high) {
      emit('🍞  partitioning from', red(low), red(high));
      let pivotLocation = partition(arr, low, high);
      emit('⛳️  pivotLocation', pivotLocation, highlightIndex(arr, pivotLocation));
      emit('sorting left from', low, 'to', pivotLocation);
      sort(arr, low, pivotLocation);
      emit('sorting right from', pivotLocation + 1, 'to', high);
      sort(arr, pivotLocation + 1, high);
    }
    return;
  }

  sort(arr, 0, arr.length);
  return { iterationCount, arr };
}
