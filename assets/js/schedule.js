// Select save schedule button
const saveSchedule = document.querySelector('#save-schedule');

// Load timer schedule from local storage or return default values if nothing is saved
function loadTimerSchedule() {
    const schedule = localStorage.getItem('timer-schedule');
    if (schedule) {
        return JSON.parse(schedule);
    } else {
        return {
            shift_duration: 8,
            number_of_breaks: 2,
            break_duration: 15
        }
    }
}

// Save timer schedule to local storage
function saveTimerSchedule(schedule) {
    localStorage.setItem('timer-schedule', JSON.stringify(schedule));
}

// Create event listener for save schedule button
// Alert if any fields are empty, otherwise save schedule and reset the schedule
saveSchedule.addEventListener('click', () => {
    const shiftDuration = Number(document.querySelector('#shift-duration').value);
    const numberOfBreaks = Number(document.querySelector('#number-of-breaks').value);
    const breakDuration = Number(document.querySelector('#break-duration').value);

    if (!shiftDuration || !numberOfBreaks || !breakDuration) {
        alert('Please fill out all fields.');
        return;
    }

    saveTimerSchedule({
        shift_duration: shiftDuration,
        number_of_breaks: numberOfBreaks,
        break_duration: breakDuration
    });
    resetSchedule();
    closeModal();
});


