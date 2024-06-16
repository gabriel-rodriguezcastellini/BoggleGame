"use strict";

var timer;
var timeLeft;
var timerSelect = document.getElementById("timer-select");
var alertSound = document.getElementById("alert-sound");
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
  var selectedCell = event.target;
  var selectedRow = parseInt(selectedCell.dataset.row);
  var selectedCol = parseInt(selectedCell.dataset.col);
  var posIndex = selectedPositions.findIndex(
    (pos) => pos[0] === selectedRow && pos[1] === selectedCol
  );

  if (posIndex !== -1) {
    selectedLetters.splice(posIndex, 1);
    selectedPositions.splice(posIndex, 1);
    selectedCell.classList.remove("selected");
    updateLastSelected();
    updateNextSelectable();
    updateCurrentWord();
    return;
  }

  if (selectedPositions.length > 0) {
    var lastPos = selectedPositions[selectedPositions.length - 1];

    if (!isContiguous(lastPos[0], lastPos[1], selectedRow, selectedCol)) {
      showModal("Las letras deben ser contiguas");
      return;
    }
  }

  selectedLetters.push(selectedCell.innerText);
  selectedPositions.push([selectedRow, selectedCol]);
  selectedCell.classList.add("selected");
  document.querySelectorAll(".board-cell").forEach((element) => {
    element.classList.remove("last-selected");
    element.classList.remove("next-selectable");
  });
  updateLastSelected();
  updateCurrentWord();
  updateNextSelectable();
}

function updateLastSelected() {
  document
    .querySelectorAll(".board-cell")
    .forEach((element) => element.classList.remove("last-selected"));

  if (!selectedPositions.length) {
    return;
  }

  var lastSelectedRow = selectedPositions[selectedPositions.length - 1][0];
  var lastSelectedCol = selectedPositions[selectedPositions.length - 1][1];
  document
    .querySelector(
      `[data-row="${lastSelectedRow}"][data-col="${lastSelectedCol}"]`
    )
    .classList.add("last-selected");
}

function updateNextSelectable() {
  document
    .querySelectorAll(".board-cell")
    .forEach((element) => element.classList.remove("next-selectable"));

  if (!selectedPositions.length) {
    return;
  }

  var lastSelectedRow = selectedPositions[selectedPositions.length - 1][0];
  var lastSelectedCol = selectedPositions[selectedPositions.length - 1][1];

  for (let row = lastSelectedRow - 1; row <= lastSelectedRow + 1; row++) {
    for (let col = lastSelectedCol - 1; col <= lastSelectedCol + 1; col++) {
      let cell = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );

      if (cell) {
        cell.classList.add("next-selectable");
      }
    }
  }

  document
    .querySelectorAll(".selected, .last-selected")
    .forEach((element) => element.classList.remove("next-selectable"));
}

function isContiguous(x1, y1, x2, y2) {
  var dx = Math.abs(x1 - x2);
  var dy = Math.abs(y1 - y2);
  return dx <= 1 && dy <= 1;
}

function startTimer() {
  clearInterval(timer);
  timeLeft = parseInt(timerSelect.value, 10);
  var timerElement = document.getElementById("timer");
  timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;
  timerElement.classList.remove("warning");
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;

    if (timeLeft <= 10) {
      timerElement.classList.add("warning");

      if (timeLeft === 10) {
        alertSound.play();
      }
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  showModal("El tiempo se ha acabado! Tu puntaje final es: " + score);
  disableBoard();
  saveGameResult(document.getElementById("player-name").value, score);
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
  var selectedCells = document.querySelectorAll(".board-cell");
  selectedCells.forEach((cell) => {
    cell.classList.remove("selected");
    cell.classList.remove("last-selected");
    cell.classList.remove("next-selectable");
  });
  updateCurrentWord();
}

function updateCurrentWord() {
  var currentWordElement = document.getElementById("current-word");
  currentWordElement.innerText = selectedLetters.join("");
}

function saveGameResult(name, score) {
  const gameResult = {
    name: name,
    score: score,
    date: new Date().toLocaleString(),
  };
  let gameResults = JSON.parse(localStorage.getItem("gameResults")) || [];
  gameResults.push(gameResult);
  localStorage.setItem("gameResults", JSON.stringify(gameResults));
}

function displayRanking(orderBy) {
  const gameResults = JSON.parse(localStorage.getItem("gameResults")) || [];
  const rankingList = document.getElementById("ranking-list");
  rankingList.innerHTML = "";

  if (orderBy === "score") {
    gameResults.sort((a, b) => b.score - a.score);
  } else if (orderBy === "date") {
    gameResults.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  gameResults.forEach((result) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Nombre: ${result.name}, Puntaje: ${result.score}, Fecha: ${result.date}`;
    rankingList.appendChild(listItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const showRankingButton = document.getElementById("show-ranking");
  const rankingModal = document.getElementById("ranking-modal");
  const closeRankingButton = document.querySelector(".close-ranking-button");
  const sortSelect = document.getElementById("sort-select");
  showRankingButton.addEventListener("click", () => {
    displayRanking(sortSelect.value);
    rankingModal.style.display = "block";
  });
  closeRankingButton.addEventListener("click", () => {
    rankingModal.style.display = "none";
  });
  window.addEventListener("click", (event) => {
    if (event.target == rankingModal) {
      rankingModal.style.display = "none";
    }
  });
  sortSelect.addEventListener("change", () => {
    displayRanking(sortSelect.value);
  });
});
document.getElementById("player-form").addEventListener("submit", startGame);
document.getElementById("word-form").addEventListener("submit", submitWord);
