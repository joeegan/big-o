function log() {}
// var log = console.log;

function swap(a, b, arr) {
  var firstIndex = arr.indexOf(a);
  var secondIndex = arr.indexOf(b);
  log('moving', b, 'toIndex', firstIndex);
  setTimeout(() => {
    arr[firstIndex] = b;
  }, 1000);
  log('moving', a, 'toIndex', secondIndex);
  setTimeout(() => {
    arr[secondIndex] = a;
  }, 1000);

  return arr;
}

export default function quickSort(arr) {

  var iterationCount = 0;

  /*
   * Modifies parts of the arr between low and high
   * @returns {Number} the next pivot location
   */
  function partition(arr, low, high) {
    var pivot = arr[low];
    var leftWall = low;
    for (var i=low + 1; i < high; i++) {
      iterationCount++;
      if (arr[i] < pivot) {
        // swap it with the element to the right of the wall
        arr = swap(arr[i], arr[leftWall], arr);
        // move the wall one space to the right
        log('left wall increased to', leftWall++);
      }
    }
    // Place pivot as the first element on the right of the partitioning wall.
    swap(pivot, arr[leftWall], arr);
    // The leftwall is the returned to reveal the splitting location for the next recurse
    return leftWall;
  }

  function sort(arr, low, high) {
    if (low < high) {
      log('partitioning from', low, high);
      let pivotLocation = partition(arr, low, high);
      log('pivotLocation', pivotLocation);
      log('sorting left from', low, 'to', pivotLocation);
      // setTimeout(() => {
        sort(arr, low, pivotLocation);
        log('sorting right from', pivotLocation + 1, 'to', high);
        sort(arr, pivotLocation + 1, high);
      // }, 1000);
    }
    return;
  }

  sort(arr, 0, arr.length);
  // return { iterationCount, arr };
  return { iterationCount, arr };
}
