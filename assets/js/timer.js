const display = document.querySelector('#timer-display');
const timerButton = document.querySelector('#timer-button');
const resetButton  = document.querySelector('#reset-button');

const timerList = calculateTimers();
let timerIndex = 0;
let timerState = "stopped";

let intervalId = createTimer(timerList[timerIndex].duration, display);

function timerControl() {
    if (timerButton.textContent === 'Start') {
        timerButton.textContent = 'Pause';
        timerState = "running";
    } else {
        timerButton.textContent = 'Start';
        timerState = "stopped";
    }
}

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

        if (timerState === "running") {
            timer--;
        }

        if (timer < 0) {
            // TODO: Add check for end of shift
            // TODO: Maybe call reset function instead
            clearInterval(intervalId);
            display.textContent = "Break Time!"; // TODO: Maybe make this a modal
            timerIndex++;
            timerControl();
        }
    }, 1000);

    return intervalId;
}

function loadTimerSchedule() {
    // TODO: Load schedule from local storage
    return {
        shift_duration: 8,
        number_of_breaks: 2,
        break_duration: 15
    };
}

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

resetButton.addEventListener('click', function() {
    // TODO: Move to separate function
    clearInterval(intervalId);
    timerState = "stopped";
    timerIndex++; // This is here for testing. Remove this line before submitting.
    intervalId = createTimer(timerList[timerIndex].duration, display);
    timerButton.textContent = 'Start';
});

timerButton.addEventListener('click', timerControl);