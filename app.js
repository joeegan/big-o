// O(n)

function itemInList(itemToVerify, list) {
  let iterationCount = 0;
  for (let item of list) {
    iterationCount++;
    // example solution to verify the item, it won't execute in this demo
    if (itemToVerify == item) {
      return true;
    }
  }
  return iterationCount;
}

console.log(itemInList(0, [1,5,2]));
