import _ from 'lodash';
import style from './style.css';
import binarySearch, { emitter } from './binary-search';

let _data = _.range(1, 21).map(n => n * 3); // [1,,40]
let target = _.sample(_data); // random int, inclusive of 1 and 20
let indexesOfInterest = _.range(0, 20) // produces [0,,19];
const element = document.getElementById('chart_binary_search');
const queue = [];

const states = {
  found: {
    color: 'lightseagreen',
    annotation: 'Found it!',
  },
  target: {
    color: 'lightgreen',
    annotation: 'Target',
  },
  guess: {
    color: 'lightpink',
    annotation: 'Guess',
  },
  notOfInterest: {
    color: 'lightgrey',
    annotation: '',
  },
  neutral: {
    color: 'lightblue',
    annotation: '',
  }
};

const options = {
  title: `Searching for item with the value ${target}`,
  legend: 'none',
  fontName: 'Times-Roman',
  hAxis: {
    title: 'index',
    gridlines: {
      count: 20
    } ,
    baselineColor: '#CCC',
  },
  vAxis: {
    title: 'value',
    baselineColor: '#CCC',
  },
};

emitter.on('msg', (msg, target, guessIndex, guessValue, indexesOfInterest) => {
  const log = document.querySelector('p.log');
  const p = document.createElement('p');
  p.innerHTML = msg;
  queue.push(() => {
    const data = google.visualization.arrayToDataTable(processArray(_data, target, guessIndex, guessValue, indexesOfInterest));
    const chart = new google.visualization.ColumnChart(element);
    chart.draw(data, options);
    // log.appendChild(p);
  });
});

/*
 * @param value {number} The value in the array slot
 * @param i {number} A slot in the array
 * @param target {number} The index we are trying to find
 * @param guess {number} The index we guessed the value might be at
 */
function getState(value, i, target, guessIndex, guessValue, indexesOfInterest) {
  if (guessValue === target && guessIndex === i) {
    return states.found;
  } else if (value === target) {
    return states.target;
  } else if (indexesOfInterest && indexesOfInterest.indexOf(i) === -1) {
    return states.notOfInterest;
  } else if (i == guessIndex) {
    return states.guess;
  }
  return states.neutral;
}

function processArray(arr, target, guessIndex, guessValue, indexesOfInterest) {
  return [[
    'value',
    'index',
    { role: 'style' },
    { role: 'annotation' },
  ]].concat(arr.map((value, i) => {
    const { color, annotation } = getState(value, i, target, guessIndex, guessValue, indexesOfInterest);
    return [i, value, color, annotation];
  }));
}

function init() {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(() => {
    const data = google.visualization.arrayToDataTable(processArray(_data, target));
    const chart = new google.visualization.ColumnChart(element);
    chart.draw(data, options);
    binarySearch(target, _data);
    const interval = setInterval(() => {
      if (queue.length) {
        queue.shift()();
      } else {
        clearInterval(interval);
      }
    }, 1000);
  });
}

window.onload = init;
