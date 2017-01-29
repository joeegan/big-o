let _data = [13,9,8,7,6,1,14,17,2,3,10,4,5,11,12,15,20,19,18,16];
let results = [['item', 'index']].concat(_data.map((d, i) => [i, d]));

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

var d = quickSort(_data).arr;

setInterval(() => {
  results = [['item', 'index']].concat(d.map((d, i) => [i, d]));
  chart.draw(google.visualization.arrayToDataTable(results), options);
}, 2000);

window.onload = init;
