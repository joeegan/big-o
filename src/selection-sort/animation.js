import _ from 'lodash';
import style from '../style.css';
import selectionSort, { emitter } from './algo';

window.onload = init;

function init() {
  const array = _.range(1, 200).map(n => _.random(1,9999));
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(() => {
    const animationQueue = setupAnimationQueue();
    draw(array);
    listen(animationQueue);
    selectionSort(array);
  });
}

function draw(array) {
  const element = document.getElementById('chart_selection_sort');
  console.log(array);
  const data = google.visualization.arrayToDataTable(
    processArray(array)
  );
  const chart = new google.visualization.ColumnChart(element);
  chart.draw(data, getOptions());
}

function listen(animationQueue) {
  emitter.off('msg');
  emitter.on('msg', (msg, args) => {
    animationQueue.push(() => {
      const { arr } = args;
      draw(arr);
    });
  });
}

function setupAnimationQueue() {
  const queue = [];
  const interval = setInterval(() => {
    if (queue.length) {
      queue.shift()();
    } else {
      clearInterval(interval);
    }
  }, 60);
  return queue;
}

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

const getOptions = (target) => ({
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
});

/*
 * @param value {number} The value in the array slot
 * @param i {number} A slot in the array
 * @param target {number} The index we are trying to find
 * @param guess {number} The index we guessed the value might be at
 */
function getState(value, i, target, guessIndex, guessValue, indexesOfInterest) {
  return states.neutral;
}

function processArray(arr, ...args) {
  return [[
    'value',
    'index',
    { role: 'style' },
    { role: 'annotation' },
  ]].concat(arr.map((value, i) => {
    const { color, annotation } = getState(value, i, ...args);
    return [i, value, color, annotation];
  }));
}
