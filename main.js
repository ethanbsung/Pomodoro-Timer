const pieChart = document.getElementById("pie-chart");
const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let timeLeft = 1500; // 25 minutes in seconds
let totalTime = timeLeft; // Keep track of total time
let interval = null; // Interval for timer

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Update the text inside the timer
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

    // Calculate the percentage of time completed
    const percentage = ((totalTime - timeLeft) / totalTime) * 360;

    // Update the pie-chart background dynamically
    pieChart.style.background = `conic-gradient(
        rgba(85, 239, 196, 1) 0deg, /* Start mint green */
        rgba(129, 236, 236, 1) ${percentage / 3}deg, /* Cyan transition */
        rgba(116, 185, 255, 1) ${percentage * 0.66}deg, /* Soft blue */
        rgba(162, 155, 254, 1) ${percentage}deg, /* Lavender */
        rgba(200, 200, 200, 1) ${percentage}deg, /* Remaining gray */
        rgba(200, 200, 200, 1) 360deg
    )`;
};

const startTimer = () => {
    if (interval !== null) return; // Prevent multiple intervals
    start.disabled = true;

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(interval);
            interval = null;
            alert("Time's up!");
            resetTimer();
        }
    }, 1000);
};

const stopTimer = () => {
    clearInterval(interval);
    interval = null;
    start.disabled = false;
};

const resetTimer = () => {
    clearInterval(interval);
    interval = null;
    timeLeft = 1500;
    totalTime = 1500;
    updateTimer();
    start.disabled = false;
};

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

// Initialize timer display
updateTimer();