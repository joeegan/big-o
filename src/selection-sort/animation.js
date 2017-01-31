import _ from 'lodash';
import style from '../style.css';
import selectionSort, { emitter } from './algo';

window.onload = init;

function init() {
  const array = _.range(1, 50).map(n => _.random(1,500));
  const element = document.getElementById('chart_selection_sort');
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(() => {
    const animationQueue = setupAnimationQueue();
    const chart = new google.visualization.ColumnChart(element);
    draw(chart, array);
    listen(animationQueue, chart);
    selectionSort(array);
  });
}

function draw(chart, arr, { currentIndex, smallest, candidate }={}) {
  const data = google.visualization.arrayToDataTable(
    processArray(arr, { currentIndex, smallest, candidate })
  );
  chart.draw(data, getOptions());
}

function listen(animationQueue, chart) {
  emitter.on('msg', (msg, args) => {
    animationQueue.push(() => {
      const { arr, currentIndex, smallest, candidate } = args;
      draw(chart, arr, { currentIndex, smallest, candidate });
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
  },
  candidate: {
    color: 'lightpink',
  },
  notOfInterest: {
    color: 'lightgrey',
  },
  neutral: {
    color: 'lightblue',
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
