const ROWS = 100;
const COLS = 100;
const MAX_GEN = 1000;
const world = document.getElementsByClassName("world")[0];
let genCount;
let nextGenData;
let autoPlay;
let autoInterval;

let fightersArr,
  pentominoArr,
  acornArr,
  gliderArr,
  spaceShipArr,
  oscillatorArr,
  stableArr;

window.onload = () => {
  initWorld();
  initSamplePatterns();
};

const initWorld = () => {
  let template = ``;
  for (let i = 0; i < ROWS; i++) {
    template += `<div class="row" id="r_${i}" >`;
    for (let j = 0; j < COLS; j++) {
      template += `<div class="cell" id="c_${i}_${j}" onclick="clickToToggleAlive(${i},${j})" ></div>`;
    }
    template += "</div>";
  }
  world.innerHTML = template;

  nextGenData = [];
  for (let a = 0; a < ROWS; a++) {
    nextGenData.push(new Array(COLS).fill("cell"));
  }
  updateWorldNewGenData();
  genCount = 0;
  autoPlay = false;
  clearInterval(autoInterval);
  autoInterval = null;
  document.getElementById("startBtn").innerText = "Start";
  document.getElementById("genCount").innerHTML = `Gen Count: ${genCount}`;
  world.scrollTo(700, 700);
};

const makeCellAlive = (i, j) => {
  const cell = document.getElementById(`c_${i}_${j}`);
  if (cell) cell.classList.add("alive");
};

const makeCellDead = (i, j) => {
  const cell = document.getElementById(`c_${i}_${j}`);
  if (cell) cell.classList.remove("alive");
};

const checkIfCellAlive = (i, j) => {
  const cell = document.getElementById(`c_${i}_${j}`);
  if (cell) {
    const status = cell.classList.contains("alive");
    return status;
  } else return false;
};

const getNeighborAliveCount = (i, j) => {
  const neighbours = [
    document.getElementById(`c_${i - 1}_${j - 1}`),
    document.getElementById(`c_${i - 1}_${j}`),
    document.getElementById(`c_${i - 1}_${j + 1}`),
    document.getElementById(`c_${i}_${j - 1}`),
    document.getElementById(`c_${i}_${j + 1}`),
    document.getElementById(`c_${i + 1}_${j - 1}`),
    document.getElementById(`c_${i + 1}_${j}`),
    document.getElementById(`c_${i + 1}_${j + 1}`),
  ];
  let neighborAliveCount = 0;
  for (c = 0; c < 8; c++) {
    if (neighbours[c]) {
      if (neighbours[c].classList.contains("alive")) neighborAliveCount++;
    }
  }
  return neighborAliveCount;
};

const updateWorldNewGenData = () => {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      document.getElementById(`c_${i}_${j}`).className = nextGenData[i][j];
    }
  }
};

const generateNewGenData = () => {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let newClassName;
      const aliveNeighbours = getNeighborAliveCount(i, j);
      const selfAlive = document
        .getElementById(`c_${i}_${j}`)
        .classList.contains("alive");

      if (selfAlive) {
        if (aliveNeighbours <= 1 || aliveNeighbours >= 4) newClassName = "cell";
        else newClassName = "cell alive";
      } else {
        if (aliveNeighbours === 3) newClassName = "cell alive";
        else newClassName = "cell";
      }
      nextGenData[i][j] = newClassName;
    }
  }
};

const startGenerations = () => {
  autoInterval = setInterval(() => {
    nextGen();
  }, 100);
  // nextGen();
};

const nextGen = () => {
  generateNewGenData();
  updateWorldNewGenData();
  genCount++;
  document.getElementById("genCount").innerHTML = `Gen Count: ${genCount}`;
  // setTimeout(() => {
  //   nextGen();
  // }, 100);
};

const toggleAutoPlay = () => {
  const startBtn = document.getElementById("startBtn");
  if (autoPlay) {
    clearInterval(autoInterval);
    startBtn.innerText = "Start";
  } else {
    startGenerations();
    startBtn.innerText = "Stop";
  }
  autoPlay = !autoPlay;
};

const clickToToggleAlive = (i, j) => {
  const cell = document.getElementById(`c_${i}_${j}`);
  cell.classList.toggle("alive");
};

const initSamplePatterns = () => {
  fightersArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  pentominoArr = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  acornArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  gliderArr = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  spaceShipArr = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  oscillatorArr = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  stableArr = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  drawSamplePattern(fightersArr, "fighters");
  drawSamplePattern(pentominoArr, "pentomino");
  drawSamplePattern(acornArr, "acorn");
  drawSamplePattern(gliderArr, "glider");
  drawSamplePattern(spaceShipArr, "spaceShip");
  drawSamplePattern(oscillatorArr, "oscillator");
  drawSamplePattern(stableArr, "stable");
};

const drawSamplePattern = (patternArr, patternElementId) => {
  let template = "";
  for (let i = 0; i < patternArr.length; i++) {
    template += "<div class='row'>";
    for (let j = 0; j < patternArr[0].length; j++) {
      const isAlive = patternArr[i][j];
      const className = isAlive ? "cell alive" : "cell";
      template += `<div class="${className}" ></div>`;
    }
    template += "</div>";
  }
  document.getElementById(patternElementId).innerHTML = template;
};

const clickToAddSample = (patternArr) => {
  initWorld();
  for (let i = ROWS / 2; i < ROWS / 2 + patternArr.length; i++) {
    for (let j = COLS / 2; j < COLS / 2 + patternArr[0].length; j++) {}
  }
  for (let i = 0; i < patternArr.length; i++) {
    let rowNum = ROWS / 2 + i;
    for (let j = 0; j < patternArr[0].length; j++) {
      let colNum = COLS / 2 + j;
      const isAlive = patternArr[i][j];
      const className = isAlive ? "cell alive" : "cell";
      document.getElementById(`c_${rowNum - 1}_${colNum - 1}`).className =
        className;
      console.log(className);
    }
  }
};

const rulesModal = document.getElementsByClassName("rulesModal")[0];
const openRules = () => {
  rulesModal.style.display = "flex";
};
const closeRules = () => {
  rulesModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == rulesModal) {
    closeRules();
  }
};
