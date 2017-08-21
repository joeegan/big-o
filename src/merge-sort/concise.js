function merge(left, right) {
  const result = []
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    }
    result.push(right.shift())
  }
  return result.concat(left).concat(right)
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  const middle = Math.floor(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}

var arr = [1, 3, 5, 2, 4, 8, 7]
mergeSort(arr)
