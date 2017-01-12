function swap(a, b, arr) {
  var firstIndex = arr.indexOf(a);
  var secondIndex = arr.indexOf(b);
  arr[firstIndex] = b;
  arr[secondIndex] = a;
  return arr;
}

function quickSort(arr) {

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
        leftWall++;
      }
    }
    // Place pivot as the first element on the right of the partitioning wall.
    swap(pivot, arr[leftWall], arr);
    // The leftwall is the returned to reveal the splitting location for the next recurse
    return leftWall;
  }

  function sort(arr, low, high) {
    if (low < high) {
      let pivotLocation = partition(arr, low, high);
      sort(arr, low, pivotLocation);
      sort(arr, pivotLocation + 1, high);
    }
    return;
  }

  sort(arr, 0, arr.length);
  return iterationCount;
}
