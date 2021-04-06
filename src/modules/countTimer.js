const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    let idInterval;

    const getTimerRemaining = () => {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
        return { timeRemaining, seconds, minutes, hours };
    };

    const updateClock = () => {
        const timer = getTimerRemaining();
        timerHours.textContent = (timer.hours < 10) ? `0${timer.hours}` : timer.hours;
        timerMinutes.textContent = (timer.minutes < 10) ? `0${timer.minutes}` : timer.minutes;
        timerSeconds.textContent = (timer.seconds < 10) ? `0${timer.seconds}` : timer.seconds;

        if (timer.timeRemaining < 0) {
            clearInterval(idInterval);
            timerHours.textContent = timerMinutes.textContent = timerSeconds.textContent = '00';
        }
    };

    idInterval = setInterval(updateClock);
};

export default countTimer;