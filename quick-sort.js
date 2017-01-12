function swap(a, b, arr) {
  var firstIndex = arr.indexOf(a);
  var secondIndex = arr.indexOf(b);
  arr[firstIndex] = b;
  arr[secondIndex] = a;
  return arr;
}

function quickSort(arr) {

  var iterationCount = 0;

  function partition(arr, low, high) {
    var pivot = arr[low];
    var leftWall = low;
    for (var i=low+1; i<high; i++) {
      iterationCount++;
      if (arr[i] < pivot) {

        arr = swap(arr[i], arr[leftWall], arr);
        leftWall = leftWall + 1;
      }
    }
    swap(pivot, arr[leftWall], arr);
    return leftWall;
  }

  function sort(arr, low, high) {
    if (low < high) {
      let pivotLocation = partition(arr, low, high);
      sort(arr, low, pivotLocation);
      sort(arr, pivotLocation + 1, high);
    }
  }

  sort(arr, 0, arr.length);
  return iterationCount;
}
