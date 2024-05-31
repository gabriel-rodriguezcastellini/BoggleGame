"use strict";

var timer;
var score = 0;
var wordsFound = [];
var boardLetters = [];
var boardSize = 4;
var selectedLetters = [];
var selectedPositions = [];

function startGame(event) {
  event.preventDefault();
  var playerName = document.getElementById("player-name").value;
  if (playerName.length < 3) {
    showModal("El nombre debe tener al menos 3 letras");
    return;
  }
  initializeBoard();
  startTimer();
}

function initializeBoard() {
  var board = document.getElementById("game-board");
  board.innerHTML = "";
  boardLetters = [];
  selectedLetters = [];
  selectedPositions = [];
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < boardSize; i++) {
    boardLetters[i] = [];
    for (var j = 0; j < boardSize; j++) {
      var letter = letters.charAt(Math.floor(Math.random() * letters.length));
      boardLetters[i][j] = letter;
      var cell = document.createElement("div");
      cell.className = "board-cell";
      cell.innerText = letter;
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", selectLetter);
      board.appendChild(cell);
    }
  }
}

function selectLetter(event) {
  var cell = event.target;
  var row = parseInt(cell.dataset.row);
  var col = parseInt(cell.dataset.col);

  var posIndex = selectedPositions.findIndex(
    (pos) => pos[0] === row && pos[1] === col
  );
  if (posIndex !== -1) {
    selectedLetters.splice(posIndex, 1);
    selectedPositions.splice(posIndex, 1);
    cell.classList.remove("selected");
    cell.classList.remove("last-selected");
    var lastPos = selectedPositions[selectedPositions.length - 1];

    if (lastPos) {
      document
        .querySelector(`[data-row="${lastPos[0]}"][data-col="${lastPos[1]}"]`)
        .classList.add("last-selected");
    }

    updateCurrentWord();
    return;
  }

  if (selectedPositions.length > 0) {
    var lastPos = selectedPositions[selectedPositions.length - 1];
    if (!isContiguous(lastPos[0], lastPos[1], row, col)) {
      showModal("Las letras deben ser contiguas");
      return;
    }
  }

  selectedLetters.push(cell.innerText);
  selectedPositions.push([row, col]);
  cell.classList.add("selected");
  document
    .querySelectorAll(".board-cell")
    .forEach((element) => element.classList.remove("last-selected"));
  cell.classList.add("last-selected");
  updateCurrentWord();
}

function isContiguous(x1, y1, x2, y2) {
  var dx = Math.abs(x1 - x2);
  var dy = Math.abs(y1 - y2);
  return dx <= 1 && dy <= 1;
}

function startTimer() {
  var timeRemaining = 180;
  timer = setInterval(function () {
    if (timeRemaining <= 0) {
      clearInterval(timer);
      endGame();
    }
    updateTimerDisplay(timeRemaining);
    timeRemaining--;
  }, 1000);
}

function updateTimerDisplay(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  var display = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  document.getElementById("timer").innerText = "Tiempo: " + display;
}

function endGame() {
  showModal("El tiempo se ha acabado! Tu puntaje final es: " + score);
  disableBoard();
}

function showModal(message) {
  var modal = document.getElementById("modal");
  var modalMessage = document.getElementById("modal-message");
  var closeButton = document.querySelector(".close-button");

  modalMessage.innerText = message;
  modal.style.display = "block";

  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function disableBoard() {
  var board = document.getElementById("game-board");
  var letters = board.getElementsByTagName("div");
  for (var i = 0; i < letters.length; i++) {
    letters[i].style.pointerEvents = "none";
    letters[i].style.opacity = "0.5";
  }
}

async function submitWord(event) {
  event.preventDefault();
  var word = selectedLetters.join("").toLowerCase();

  if (word.length < 3) {
    showModal("La palabra debe tener al menos 3 letras");
    updateScore(-1);
    return;
  }

  if (wordsFound.indexOf(word) !== -1) {
    showModal("Ya encontraste esa palabra");
    updateScore(-1);
    return;
  }

  if (!(await isValidWord(word))) {
    showModal("La palabra no es válida");
    updateScore(-1);
    return;
  }

  wordsFound.push(word);
  updateScore(word.length);
  updateWordList(word);

  resetSelection();
}

async function isValidWord(word) {
  var response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  return response.ok;
}

function updateScore(points) {
  score += points;
  if (score < 0) {
    score = 0;
  }
  document.getElementById("score").innerText = "Puntaje: " + score;
}

function updateWordList(word) {
  var wordList = document.getElementById("word-list");
  var listItem = document.createElement("li");
  listItem.innerText = word;
  wordList.appendChild(listItem);
}

function resetSelection() {
  selectedLetters = [];
  selectedPositions = [];
  var selectedCells = document.querySelectorAll(".selected");
  selectedCells.forEach((cell) => {
    cell.classList.remove("selected");
    cell.classList.remove("last-selected");
  });
  updateCurrentWord();
}

function updateCurrentWord() {
  var currentWordElement = document.getElementById("current-word");
  currentWordElement.innerText = selectedLetters.join("");
}

document.getElementById("player-form").addEventListener("submit", startGame);
document.getElementById("word-form").addEventListener("submit", submitWord);
