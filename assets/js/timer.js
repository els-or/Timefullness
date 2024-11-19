// Select timer display, timer start/pause button, and reset button
const display = document.querySelector('#timer-display');
const timerButton = document.querySelector('#timer-button');
const resetButton  = document.querySelector('#reset-button');

// Generate timer list initial state on page load
let timerList = calculateTimers();
let timerIndex = 0;
let timerState = "stopped";
let intervalId = createTimer(timerList[timerIndex].duration, display);


// Manage state/pause button text and timer state
function timerControl() {
    if (timerButton.textContent === 'Start') {
        timerButton.textContent = 'Pause';
        timerState = "running";
    } else {
        timerButton.textContent = 'Start';
        timerState = "stopped";
    }
}

// Reset the state of the motivational quote status after session
function resetMotivQuoteStatus() {
    motivQuoteStatus = false;
}
// Reset the state of the break quote status after session
function resetBreakQuoteStatus() {
    breakQuoteStatus = false;
}

// Manage timer using setInterval to update every second.  
// This function displays the status of the timer, counts dowwn every second, and moves to the next timer when the current timer reaches 0.
function createTimer(duration, display) {
    let timer = duration;
    const intervalId = setInterval(function () {
        let hours = parseInt(timer / 3600, 10);
        let minutes = parseInt((timer - (hours * 3600)) / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        // Change <h2> tag based on session status
        const sessionStatus = document.querySelector('h2');
        if (timerList[timerIndex].type === "work") {
            sessionStatus.textContent = "Time until next break";
        } else if (timerList[timerIndex].type === "break") {
            sessionStatus.textContent = "Break Time!";
        }

        statusDisplay = document.createElement('p');
        let message = "Timer: " + (timerIndex + 1) + "/" + (timerList.length) + " - ";
        if (timerList[timerIndex].type === "work") {
            message += "Work Session";
            getMotivationalQuote();
        } else if (timerList[timerIndex].type === "break") {
            message += "Break Time";
            getBreakQuote();
        }
        statusDisplay.textContent = message;
        display.appendChild(statusDisplay);

        if (timerState === "running") {
            timer--;
        }

        if (timer < 0) {
            timerIndex++;
            if (timerIndex >= timerList.length) {
                endOfDay();
                return;
            }
            resetTimer();
            if (timerList[timerIndex].type === "break") {
                resetMotivQuoteStatus();
            }
            if (timerList[timerIndex].type === "work") {
                resetBreakQuoteStatus();
            }
            timerControl();
        }
    }, 1000);

    return intervalId;
}



// Calculate the timers based on the schedule and return an array of objects with the duration and type of each timer.
function calculateTimers() {
    const schedule = loadTimerSchedule();
    const shiftDuration = schedule.shift_duration * 3600;
    const totalBreakDuration = schedule.number_of_breaks * (schedule.break_duration * 60);
    const shiftDelta = shiftDuration - totalBreakDuration;
    const numberOfWorkSessions = schedule.number_of_breaks + 1;
    const workSessionDuration = shiftDelta / numberOfWorkSessions;
    console.log("Shift Duration: " + shiftDuration / 3600);
    console.log("Total Break Duration: " + totalBreakDuration / 60);
    console.log("Shift Delta: " + shiftDelta / 3600);
    console.log("Number of Work Sessions: " + numberOfWorkSessions);
    console.log("Work Session Duration: " + workSessionDuration / 60);

    let timerList = [];
    timerList.push({duration: workSessionDuration, type: "work"});
    for (let i = 0; i < schedule.number_of_breaks; i++) {
        timerList.push({duration: schedule.break_duration * 60, type: "break"});
        timerList.push({duration: workSessionDuration, type: "work"});
    }
    console.log(timerList);
    return timerList;
}

// Reset the current time to the beginning of the current timer.
function resetTimer() {
    clearInterval(intervalId);
    timerState = "stopped";
    intervalId = createTimer(timerList[timerIndex].duration, display);
    timerButton.textContent = 'Start';
}

// Reset the schedule back to the beginning.
function resetSchedule() {
    timerIndex = 0;
    resetTimer();
}

// Update display and clear timer interval when the work day is over.
function endOfDay() {
    display.textContent ="End of work day! Yay!";
    clearInterval(intervalId);
}


// This is the correct event listener for the reset button.
// resetButton.addEventListener('click', resetTimer);

// This is a special event listener for the reset button.  For testing, it increments the timerIndex.
resetButton.addEventListener('click', function(){
    timerIndex++;
    if (timerIndex >= timerList.length) {
        endOfDay();
        return;
    }
    resetTimer();
    resetMotivQuoteStatus();
    resetBreakQuoteStatus();
});

// This is the event listener for the timer button.
timerButton.addEventListener('click', timerControl);