let document = require('document')
import { exercise } from 'exercise'
import { geolocation } from 'geolocation'

// parent svg of exercise_interface
let exerciseInterface = document.getElementById('exerciseInterface')
// hide the texts
exerciseInterface.style.visibility = 'hidden'

// show modal
let myPopup = document.getElementById('myPopup')
myPopup.style.display = 'none'

// stop button
let stopExerciseButton = document.getElementById('stopExerciseButton')

// resume button
let resumeExerciseButton = document.getElementById('resumeExerciseButton')

// start button
let startButton = document.getElementById('startButton')
let startExerciseButton = document.getElementById('startExerciseButton')

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

// timer for the update
let timer = undefined

let update = () => {
    // check if state it on started and watch the position via gps
    if (exercise.state !== 'started') {
        return
    }

    // Distance travelled, in meters
    distanceValue.text = `${exercise.stats.distance} m`
    // Speed, in m/s
    speedValue.text = `${exercise.stats.speed.current} m/s`
    // Pace, in seconds per kilometer
    paceValue.text = `${exercise.stats.pace.current} s/km`
    // Heart rate, in beats per minute
    heartbeatValue.text = `${exercise.stats.heartRate.current} b/m`
    // Time spent in the "started" state, in milliseconds
    activeValue.text = `${((exercise.stats.activeTime % 60000) / 1000).toFixed(
        0
    )} s`
    // Number of calories burned, in calories (kcal)
    caloriesValue.text = `${exercise.stats.calories} kcal`
}

startExerciseButton.onactivate = function(event) {
    // hide the button
    startButton.style.visibility = 'hidden'

    // show the stats
    exerciseInterface.style.visibility = 'visible'

    // actually start the exercise
    exercise.start('run', { gps: true, autopause: true })
    console.log('Exercise started!')
}

stopExerciseButton.onclick = function(event) {
    // hide the modal
    myPopup.style.display = 'none'
    // show start button
    startButton.style.visibility = 'visible'
    // hide the stats
    exerciseInterface.style.visibility = 'hidden'

    // stop the exercise
    exercise.stop()
}

resumeExerciseButton.onclick = function(event) {
    // resume the exercise
    exercise.resume()
    // hide the modal
    myPopup.style.display = 'none'
}

geolocation.watchPosition(position => {
    console.log(position.longitude, position.latitude)
})

exercise.onstatechange = () => {
    console.log('Exercise changed state')

    if (exercise.state === 'paused') {
        exerciseInterface.style.visibility = 'hidden'
        myPopup.style.display = 'inline'
    }

    if (exercise.state === 'started') {
        exerciseInterface.style.visibility = 'visible'
    }

    if (exercise.state !== 'started') {
        // we're not supposed to consume anything right now,
        // make sure, we aren't
        if (typeof timer !== 'undefined') {
            clearInterval(timer)
            timer = undefined
        }
        return
    }

    // run, Forrest, run!
    if (typeof timer === 'undefined') {
        timer = setInterval(update, 100)
    }
}
