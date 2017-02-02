export default function insertionSort(arr) {
  const emit = () => {};
  for (var end=1; end<arr.length; end++) {

    emit(`analysing range 0 to ${end} of ${arr}`)
    // Loop over the sub array, checking the key against the preceeding elements
    for (var i=end; i >= 0; i--) {
      var key = arr[i];
      for (var j=i-1; j >= 0; j--) {
        var candidate = arr[j];
        emit(`i ${i}, key ${key}, j ${j}, candidate ${candidate}`);
        emit(`comparing ${key} > ${candidate}`)
        if (key > candidate) {
          emit(`key ${key} > candidate ${candidate}
            so writing value ${key} to index ${j+1}`);
          arr[j+1] = key;
          break;
        } else {
          arr[j+1] = candidate;
          emit(`written over ${arr[j+1]} with ${candidate}, ${arr}`);
          if (j === 0) {
            arr[j] = key;
            emit(`zeroeth in the sub array, key is ${key}`, arr);
          }
        }
      }
    }
  }

  return { arr };

}
