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

/**
 * In order to update the value of a stat, for instance distance, we need to update that value every couple milliseconds.
 * We assign the values to the specific text attributes of each stat.
 */
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

/**
 * Checks if the 'start' button has been activated and starts the 'run' exercise plus activates grps tracking.
 * Should the user not run anymore, autopause is activated automatically.
 */
startExerciseButton.onactivate = function(event) {
    // hide the button
    startButton.style.visibility = 'hidden'

    // show the stats
    exerciseInterface.style.visibility = 'visible'

    // actually start the exercise
    exercise.start('run', { gps: true, autopause: true })
    console.log('Exercise started!')
}

/**
 * Stops the running exercise and goes back to the main screen
 */
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

/**
 * If the runner decides to keep moving, we resume the exercise after a click on this button
 */
resumeExerciseButton.onclick = function(event) {
    // resume the exercise
    exercise.resume()
    // hide the modal
    myPopup.style.display = 'none'
}

/**
 * Watches the actual position of the runner while running and provides longitude and latitude for further usage
 */
geolocation.watchPosition(position => {
    console.log(position.longitude, position.latitude)
})

/**
 *  if the state of our exercise changes, we fire up this function and check in what state we are in.
 *  depending on the state, we show and hide specific views and buttons
 */
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
        /**
         * we're not supposed to consume anything right now,
         * make sure, we aren't
         */

        if (typeof timer !== 'undefined') {
            clearInterval(timer)
            timer = undefined
        }
        return
    }

    /**
     *  set the timer to update the value every 100 ms
     */
    if (typeof timer === 'undefined') {
        timer = setInterval(update, 100)
    }
}
