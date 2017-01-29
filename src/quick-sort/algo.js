function emit() {} // TODO

function swap(a, b, arr) {
  const firstIndex = arr.indexOf(a);
  const secondIndex = arr.indexOf(b);
  // emit('moving', b, 'toIndex', firstIndex);
  arr[firstIndex] = b;
  // emit('moving', a, 'toIndex', secondIndex);
  arr[secondIndex] = a;
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
    const leftWall = low;
    for (let i=low + 1; i < high; i++) {
      iterationCount++;
      if (arr[i] < pivot) {
        // swap it with the element to the right of the wall
        arr = swap(arr[i], arr[leftWall], arr);
        // move the wall one space to the right
        // emit('left wall increased to', leftWall++);
      }
    }
    // Place pivot as the first element on the right of the partitioning wall.
    swap(pivot, arr[leftWall], arr);
    // The leftwall is the returned to reveal the splitting location for the next recurse
    return leftWall;
  }

  function sort(arr, low, high) {
    if (low < high) {
      // emit('partitioning from', low, high);
      let pivotLocation = partition(arr, low, high);
      // emit('pivotLocation', pivotLocation);
      // emit('sorting left from', low, 'to', pivotLocation);
      sort(arr, low, pivotLocation);
      // emit('sorting right from', pivotLocation + 1, 'to', high);
      sort(arr, pivotLocation + 1, high);
    }
    return;
  }

  sort(arr, 0, arr.length);
  return { iterationCount, arr };
}
