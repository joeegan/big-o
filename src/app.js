import _ from 'lodash';
import style from './style.css';
import binarySearch from './binary-search/algo';
import quickSort from './quick-sort';

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

// O(n^2)
function allCombinations(list) {
  let iterationCount = 0;
  const results = [];
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
  for (let i = 0; i < n+1; i++) {
    results.push([i, itemInList(i, new Array(i))]);
  }
  return results;
}

function oNTwo(n) {
  const results = [['Operations', 'Array length']];
  for (let i = 0; i < n+1; i++) {
    results.push([i, allCombinations(new Array(i))]);
  }
  return results;
}

function oLogN(n) {
  const results = [['Operations', 'Array length']];
  for (let i = 2; i < n+3; i++) {
    const arr = _.range(1, i);
    results.push([i-2, binarySearch(0, arr).iterationCount]);
  }
  return results;
}

function oNLogN(n) {
  const results = [['Operations', 'Array length']];
  for (let i = 1; i < n+1; i++) {
    results.push([i, quickSort(new Array(i)).iterationCount]);
  }
  return results;
}

function chart(element, results) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    const data = google.visualization.arrayToDataTable(results);
    const options = {
      fontName: 'Times-Roman',
      hAxis: {title: 'Length of array'},
      vAxis: {title: 'Operations'},
      legend: 'none'
    };
    const chart = new google.visualization.LineChart(element);
    chart.draw(data, options);
  }
}

window.onload = function() {
  chart(document.getElementById('chart_div_on'), oN(200));
  window.binarySearch = binarySearch;
  chart(document.getElementById('chart_div_on_two'), oNTwo(200));
  chart(document.getElementById('chart_div_o_log_n'), oLogN(200));
  chart(document.getElementById('chart_div_o_n_log_n'), oNLogN(20));
}
