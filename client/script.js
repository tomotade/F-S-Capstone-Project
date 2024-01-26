var stopwatch = document.getElementById("stopwatch");
var startBtn = document.getElementById("start-btn");
var displaylaps = document.getElementById("display-laps");

var timeoutId = null;
var ms = 0;
var sec = 0;
var min = 0;
var lapsArr = [];
let lapNumber = 1;

/* function to start stopwatch */
function start(flag) {
  if (flag) {
    startBtn.disabled = true;
  }

  timeoutId = setTimeout(function () {
    ms = parseInt(ms);
    sec = parseInt(sec);
    min = parseInt(min);

    ms++;

    if (ms == 100) {
      sec = sec + 1;
      ms = 0;
    }
    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (ms < 10) {
      ms = "0" + ms;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    if (min < 10) {
      min = "0" + min;
    }

    stopwatch.innerHTML = min + ":" + sec + ":" + ms;

    // calling start() function recursivly to continue stopwatch
    start();
  }, 10); // setTimeout delay time 10 milliseconds
}

/* function to pause stopwatch */
function pause() {
  clearTimeout(timeoutId);
  startBtn.disabled = false;
  laps();
}

/* function to reset stopwatch */
function reset() {
  ms = 0;
  sec = 0;
  min = 0;
  clearTimeout(timeoutId);
  stopwatch.innerHTML = "00:00:00";
  startBtn.disabled = false;
  displaylaps.innerHTML = "";
  lapsArr = [];
  lapNumber = 1;
}

function laps() {
  let time = stopwatch.textContent;
  console.log(time);

  let lapInfo = {
    lapNumber,
    time,
  };
  lapsArr.push(lapInfo);
  lapNumber++;
  console.log(lapsArr);
  lapsDisplay(lapsArr);
}

function lapsDisplay(arr) {
  displaylaps.innerHTML = "";
  arr.forEach((element) => {
    let lapDiv = document.createElement("div");
    lapDiv.innerHTML = `
    <h4>LAP : ${element.lapNumber}</h4>
    <h3>TIME : ${element.time}</h3>

    `;
    displaylaps.appendChild(lapDiv);
  });
}
function save() {
  pause();
  let name = prompt("Please enter your name");
  axios
    .post(`http://localhost:4000/api/laps/${name}`, { lapsArr })
    .then((res) => alert(res.data))
    .catch((err) => console.log(err));
}
