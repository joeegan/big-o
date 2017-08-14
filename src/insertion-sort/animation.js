import _ from 'lodash'
import style from '../style.css'
import insertionSort, { emitter } from './algo'

window.onload = init

function init() {
  const arr = _.range(1, 50).map(n => _.random(1, 500))
  const element = document.getElementById(
    'chart_insertion_sort',
  )
  google.charts.load('current', { packages: ['corechart'] })
  google.charts.setOnLoadCallback(() => {
    const animationQueue = setupAnimationQueue()
    const chart = new google.visualization.ColumnChart(
      element,
    )
    draw(chart, arr)
    listen(animationQueue, chart)
    insertionSort(arr)
  })
}

function draw(chart, arr, { current, comparator } = {}) {
  const data = google.visualization.arrayToDataTable(
    processArray(arr, {
      current,
      comparator,
    }),
  )
  chart.draw(data, getOptions())
}

function listen(animationQueue, chart) {
  emitter.on('msg', (msg, args) => {
    animationQueue.push(() => {
      const { arr, current, comparator } = args
      draw(chart, arr, {
        current,
        comparator,
      })
    })
  })
}

function setupAnimationQueue() {
  const queue = []
  const interval = setInterval(() => {
    if (queue.length) {
      queue.shift()()
    } else {
      clearInterval(interval)
    }
  }, 1)
  return queue
}

const states = {
  current: {
    color: 'lightpink',
    annotation: 'Current',
  },
  comparator: {
    color: 'lightgreen',
    annotation: 'Comparator',
  },
  notOfInterest: {
    color: 'lightgrey',
  },
  neutral: {
    color: 'lightblue',
  },
}

const getOptions = target => ({
  legend: 'none',
  fontName: 'Times-Roman',
  hAxis: {
    baselineColor: '#CCC',
  },
  vAxis: {
    baselineColor: '#CCC',
  },
})

function getState(i, current, comparator) {
  if (i == comparator) {
    return states.comparator
  }
  if (i == current) {
    return states.current
  }
  if (i < current) {
    return states.notOfInterest
  }
  return states.notOfInterest
}

function processArray(arr, { current, comparator }) {
  return [
    [
      'value',
      'index',
      { role: 'style' },
      { role: 'annotation' },
    ],
  ].concat(
    arr.map((value, i) => {
      const { color, annotation } = getState(
        i,
        current,
        comparator,
      )
      return [i, value, color, annotation]
    }),
  )
}
