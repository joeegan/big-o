import _ from 'lodash';
import style from '../style.css';
import selectionSort, { emitter } from './algo';

window.onload = init;

function init() {
  const array = _.range(1, 50).map(n => _.random(1,500));
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(() => {
    const animationQueue = setupAnimationQueue();
    draw(array);
    listen(animationQueue);
    selectionSort(array);
  });
}

function draw(arr, { currentIndex, smallest, candidate }={}) {
  const element = document.getElementById('chart_selection_sort');
  const data = google.visualization.arrayToDataTable(
    processArray(arr, { currentIndex, smallest, candidate })
  );
  const chart = new google.visualization.ColumnChart(element);
  chart.draw(data, getOptions());
}

function listen(animationQueue) {
  emitter.off('msg');
  emitter.on('msg', (msg, args) => {
    animationQueue.push(() => {
      const { arr, currentIndex, smallest, candidate } = args;
      draw(arr, { currentIndex, smallest, candidate });
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
  }, 50);
  return queue;
}

const states = {
  smallest: {
    color: 'lightseagreen',
    annotation: 'Smallest',
  },
  currentIndex: {
    color: 'lightgreen',
    annotation: '',
  },
  candidate: {
    color: 'lightpink',
    annotation: '',
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
    baselineColor: '#CCC',
  },
  vAxis: {
    baselineColor: '#CCC',
  },
});

function getState(i, currentIndex, smallest, candidate) {
  if (i === smallest) {
    return states.smallest;
  }
  if (i === currentIndex) {
    return states.currentIndex;
  }
  if (i === candidate) {
    return states.candidate;
  }
  if (i < currentIndex) {
    return states.notOfInterest;
  }
  return states.neutral;
}

function processArray(arr, { currentIndex, smallest, candidate }) {
  return [[
    'value',
    'index',
    { role: 'style' },
    { role: 'annotation' },
  ]].concat(arr.map((value, i) => {
    const { color, annotation } = getState(i, currentIndex, smallest, candidate);
    return [i, value, color, annotation];
  }));
}
