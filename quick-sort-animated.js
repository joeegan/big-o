let results = [['item', 'index']];
for (var i = 1; i < 100; i++) {
  results.push([i, i]);
}

const results2 = [['item', 'index']];
for (var j = 1; j < 100; j++) {
  results2.push([j, 5]);
}

const element = document.getElementById('chart_quick_sort');

var options = {
  fontName: 'Times-Roman',
  hAxis: { title: 'index'},
  vAxis: { title: 'item'},
  legend: 'none',
  animation:{
    startup: true,
    duration: 1000,
    easing: 'out'
  },
};

var chart;
var data;

function init() {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(() => {
    data = google.visualization.arrayToDataTable(results);
    chart = new google.visualization.ColumnChart(element);
    chart.draw(data, options);
  });
}

setTimeout(() => {
  chart.draw(google.visualization.arrayToDataTable(results2), options);
}, 2000);

window.onload = init;
