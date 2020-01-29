let document = require('document')
import { exercise } from 'exercise'
import { geolocation } from 'geolocation'

// parent svg of exercise_interface
let exerciseInterface = document.getElementById('exerciseInterface')
// start button
let startButton = document.getElementById('startButton')
let startExerciseButton = document.getElementById('startExerciseButton')
// get style element for changing the background
let backgroundColor = document.getElementById('background')

// labels living in the child document of the exercise_interface(frontend)
let distanceLabel = document.getElementById('distance')
let distanceValue = document.getElementById('distanceValue')
let speedLabel = document.getElementById('speed')
let speedValue = document.getElementById('speedValue')
let paceLabel = document.getElementById('pace')
let paceValue = document.getElementById('paceValue')
let heartbeatLabel = document.getElementById('heartbeat')
let heartbeatValue = document.getElementById('heartbeatValue')
let activeLabel = document.getElementById('activeTime')
let activeValue = document.getElementById('activeValue')
let caloriesLabel = document.getElementById('calories')
let caloriesValue = document.getElementById('caloriesValue')

// hide the texts
exerciseInterface.style.visibility = 'hidden'

startExerciseButton.onactivate = function(event) {
    // hide the button
    startButton.style.visibility = 'hidden'
    // show the stats
    exerciseInterface.style.visibility = 'visible'
    // change background color to lightblue
    backgroundColor.style.fill = 'lightyellow'

    console.log('Exercise started!')
}

exercise.start('run', { gps: true, autopause: true })

let update = () => {
    // check if state it on started and watch the position via gps
    if (exercise.state === 'started') {
        geolocation.watchPosition(position => {
            console.log(position)
        })

        // Distance travelled, in meters
        distanceValue.text = `${exercise.stats.distance}`
        // Speed, in m/s
        speedValue.text = `${exercise.stats.speed.current}`
        // Pace, in seconds per kilometer
        paceValue.text = `${exercise.stats.pace.current}`
        // Heart rate, in beats per minute
        heartbeatValue.text = `${exercise.stats.heartRate.current}`
        // Time spent in the "started" state, in milliseconds
        activeValue.text = `${exercise.stats.activeTime}` + `ms`
        // Number of calories burned, in calories (kcal)
        caloriesValue.text = `${exercise.stats.calories}`
    }
}

setInterval(() => {
    update()
}, 100)
