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

function allCombinations(list) {
  let iterationCount = 0;
  var results = [];
  for (let item of list) {
    for (let innerItem of list) {
      results.push([item, innerItem]);
      iterationCount++;
    }
  }
  // We'd usually return results, but seen as we are just interested in efficiency...
  return iterationCount;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function oN(n) {
  const results = [['Operations', 'Array length']];
  for (var i = 0; i < n+1; i++) {
    results.push([i, itemInList(i, new Array(i))]);
  }
  return results;
}

function oNTwo(n) {
  const results = [['Operations', 'Array length']];
  for (var i = 0; i < n+1; i++) {
    results.push([i, allCombinations(new Array(i))]);
  }
  return results;
}

function oLogN(n) {
  const results = [['Operations', 'Array length']];
  for (var i = 0; i < n+1; i++) {
    results.push([i, binarySearch(1, new Array(i))]);
  }
  return results;
}

function oNLogN(n) {
  const results = [['Operations', 'Array length']];
  for (var i = 0; i < n+1; i++) {
    results.push([i, quickSort(new Array(i).fill().map(() => getRandomInt(n)))]);
  }
  return results;
}

function chart(element, results) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(results);
    var options = {
      fontName: 'Times-Roman',
      hAxis: {title: 'Length of array'},
      vAxis: {title: 'Operations'},
      legend: 'none'
    };

    var chart = new google.visualization.LineChart(element);

    chart.draw(data, options);
  }
}

window.onload = function() {
  chart(document.getElementById('chart_div_on'), oN(200));
  chart(document.getElementById('chart_div_on_two'), oNTwo(200));
  chart(document.getElementById('chart_div_o_log_n'), oLogN(200));
  chart(document.getElementById('chart_div_o_n_log_n'), oNLogN(200));
}
