function swap(a, b, arr) {
  var firstIndex = arr.indexOf(a);
  var secondIndex = arr.indexOf(b);
  arr[firstIndex] = b;
  arr[secondIndex] = a;
  return arr;
}

function partition(arr, pivot) {
  var leftArray = [];
  var rightArray = [];
  for (var i=0; i<arr.length-1; i++) {
    if (arr[i] < pivot) {
      leftArray.push(arr[i]);
    } else {
      rightArray.push(arr[i]);
    }
  }
  return [leftArray, rightArray];
}

function quickSort(arr) {
  var pivot = arr[0];
  // loop through the whole array, if numbers are less than pivot, they go into left partition, greater, into the right
  let [leftArray, rightArray] = partition(arr, pivot);
  // apply the quicksort algorithm to the first
  [leftArray, rightArray] = partition(leftArray, leftArray[0]);
  [leftArray, rightArray] = partition(rightArray, rightArray[0]);
  return arr;
}
