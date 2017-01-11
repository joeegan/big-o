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

function oN(n) {
  const results = [['Operations', 'Array length']];
  for (var i = 0; i < n+1; i++) {
    results.push([i, itemInList(i, new Array(i))]);
  }
  return results;
}

function chart(element, results) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(results);
    var options = {
      title: 'O(n) runtime, Linear',
      hAxis: {title: 'Length of array', minValue: 0, maxValue: 20},
      vAxis: {title: 'Operations', minValue: 0, maxValue: 150},
      legend: 'none'
    };

    var chart = new google.visualization.ScatterChart(element);

    chart.draw(data, options);
  }
}

window.onload = function() {
  chart(document.getElementById('chart_div'), oN(20));
}
