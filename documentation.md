## Functions

<dl>
<dt><a href="#update">update()</a></dt>
<dd><p>In order to update the value of a stat, for instance distance, we need to update that value every couple milliseconds.
We assign the values to the specific text attributes of each stat.</p>
</dd>
<dt><a href="#startExerciseButton">startExerciseButton()</a></dt>
<dd><p>Checks if the &#39;start&#39; button has been activated and starts the &#39;run&#39; exercise plus activates grps tracking.
Should the user not run anymore, autopause is activated automatically.</p>
</dd>
<dt><a href="#stopExerciseButton">stopExerciseButton()</a></dt>
<dd><p>Stops the running exercise and goes back to the main screen</p>
</dd>
<dt><a href="#resumeExerciseButton">resumeExerciseButton()</a></dt>
<dd><p>If the runner decides to keep moving, we resume the exercise after a click on this button</p>
</dd>
<dt><a href="#watchPosition">watchPosition()</a></dt>
<dd><p>Watches the actual position of the runner while running and provides longitude and latitude for further usage</p>
</dd>
<dt><a href="#onstatechange">onstatechange()</a></dt>
<dd><p>if the state of our exercise changes, we fire up this function and check in what state we are in.
 depending on the state, we show and hide specific views and buttons</p>
</dd>
</dl>

<a name="update"></a>

## update()
In order to update the value of a stat, for instance distance, we need to update that value every couple milliseconds.
We assign the values to the specific text attributes of each stat.

**Kind**: global function  
<a name="startExerciseButton"></a>

## startExerciseButton()
Checks if the 'start' button has been activated and starts the 'run' exercise plus activates grps tracking.
Should the user not run anymore, autopause is activated automatically.

**Kind**: global function  
<a name="stopExerciseButton"></a>

## stopExerciseButton()
Stops the running exercise and goes back to the main screen

**Kind**: global function  
<a name="resumeExerciseButton"></a>

## resumeExerciseButton()
If the runner decides to keep moving, we resume the exercise after a click on this button

**Kind**: global function  
<a name="watchPosition"></a>

## watchPosition()
Watches the actual position of the runner while running and provides longitude and latitude for further usage

**Kind**: global function  
<a name="onstatechange"></a>

## onstatechange()
if the state of our exercise changes, we fire up this function and check in what state we are in.
 depending on the state, we show and hide specific views and buttons

**Kind**: global function  