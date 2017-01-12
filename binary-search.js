function binarySearch(n, arr, iterationCount=0, idx=0) {
  iterationCount++;
  const halfway = Math.round(arr.length/2);
  const firstHalf = arr.slice(0, halfway);
  const secondHalf = arr.slice(halfway);
  const middleElement = arr[halfway];
  if (arr.length === 0 || (arr.length === 1 && arr[0] !== n)) {
    // It's not in the array, so return the iterationCount for the purpose of the demo
    return iterationCount;
  }
  if (arr.length === 1) {
    return idx;
  }
  if (n >= middleElement) {
    idx += firstHalf.length;
    return binarySearch(n, secondHalf, iterationCount, idx);
  }
  return binarySearch(n, firstHalf, iterationCount, idx);
}
