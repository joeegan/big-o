import _ from 'lodash'
import style from '../style.css'
import binarySearch, { emitter } from './algo'

window.onload = init

function init() {
  const array = _.range(1, 21).map(n => n * 3)
  const target = _.sample(array)
  google.charts.load('current', { packages: ['corechart'] })
  google.charts.setOnLoadCallback(() => {
    const animationQueue = setupAnimationQueue()
    draw(array, target)
    listen(animationQueue)
    binarySearch(target, array)
  })
}

function draw(
  array,
  target,
  guessIndex,
  guessValue,
  indexesOfInterest
) {
  const element = document.getElementById(
    'chart_binary_search'
  )
  const data = google.visualization.arrayToDataTable(
    processArray(
      array,
      target,
      guessIndex,
      guessValue,
      indexesOfInterest
    )
  )
  const chart = new google.visualization.ColumnChart(
    element
  )
  chart.draw(data, getOptions(target))
}

function listen(animationQueue) {
  emitter.off('msg')
  emitter.on('msg', (msg, args) => {
    animationQueue.push(() => {
      const {
        array,
        target,
        guessIndex,
        guessValue,
        indexesOfInterest,
      } = args
      draw(
        array,
        target,
        guessIndex,
        guessValue,
        indexesOfInterest
      )
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
  }, 600)
  return queue
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
  },
}

const getOptions = target => ({
  title: `Searching for item with the value ${target}`,
  legend: 'none',
  fontName: 'Times-Roman',
  hAxis: {
    title: 'index',
    gridlines: {
      count: 20,
    },
    baselineColor: '#CCC',
  },
  vAxis: {
    title: 'value',
    baselineColor: '#CCC',
  },
})

/*
 * @param value {number} The value in the array slot
 * @param i {number} A slot in the array
 * @param target {number} The index we are trying to find
 * @param guess {number} The index we guessed the value might be at
 */
function getState(
  value,
  i,
  target,
  guessIndex,
  guessValue,
  indexesOfInterest
) {
  if (guessValue === target && guessIndex === i) {
    return states.found
  } else if (value === target) {
    return states.target
  } else if (
    indexesOfInterest &&
    indexesOfInterest.indexOf(i) === -1
  ) {
    return states.notOfInterest
  } else if (i == guessIndex) {
    return states.guess
  }
  return states.neutral
}

function processArray(arr, ...args) {
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
        value,
        i,
        ...args
      )
      return [i, value, color, annotation]
    })
  )
}
