let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const laps = document.getElementById("laps");

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function print(txt) {
  display.innerHTML = txt;
}

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      print(timeToString(elapsedTime));
    }, 10);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    pauseButton.innerText = "Resume";
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      print(timeToString(elapsedTime));
    }, 10);
    isRunning = true;
    pauseButton.innerText = "Pause";
  }
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
  isRunning = false;
  laps.innerHTML = "";
  pauseButton.innerText = "Pause";
}

function lap() {
  if (isRunning) {
    let lapTime = document.createElement("li");
    lapTime.innerText = timeToString(elapsedTime);
    laps.insertBefore(lapTime, laps.firstChild);
  }
}

startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
