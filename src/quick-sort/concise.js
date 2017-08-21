function quickSort(arr) {
  if (!arr.length) return []

  const [head, ...tail] = arr,
    left = tail.filter(e => e < head),
    right = tail.filter(e => e >= head)

  return quickSort(left).concat(head, quickSort(right))
}
