// script.js
"use strict";

// Variables globales
var timer;
var score = 0;
var wordsFound = [];
var validWords = [
  "example",
  "word",
  "list",
  "containing",
  "valid",
  "boggle",
  "words",
]; // Lista de palabras válidas
var boardLetters = [];
var boardSize = 4; // 4x4 tablero

// Función para iniciar el juego
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

// Función para inicializar el tablero del juego
function initializeBoard() {
  var board = document.getElementById("game-board");
  board.innerHTML = ""; // Limpiar el tablero anterior
  boardLetters = [];
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < boardSize; i++) {
    boardLetters[i] = [];
    for (var j = 0; j < boardSize; j++) {
      var letter = letters.charAt(Math.floor(Math.random() * letters.length));
      boardLetters[i][j] = letter;
      var cell = document.createElement("div");
      cell.className = "board-cell";
      cell.innerText = letter;
      board.appendChild(cell);
    }
  }
}

// Función para iniciar el temporizador
function startTimer() {
  var timeRemaining = 180; // 3 minutos
  timer = setInterval(function () {
    if (timeRemaining <= 0) {
      clearInterval(timer);
      endGame();
    }
    updateTimerDisplay(timeRemaining);
    timeRemaining--;
  }, 1000);
}

// Función para actualizar la visualización del temporizador
function updateTimerDisplay(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  var display = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  document.getElementById("timer").innerText = "Tiempo: " + display;
}

// Función para finalizar el juego
function endGame() {
  showModal("El tiempo se ha acabado! Tu puntaje final es: " + score);
  // Lógica adicional para finalizar el juego, como deshabilitar el tablero
  disableBoard();
}

// Función para mostrar el modal
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

// Función para deshabilitar el tablero al final del juego
function disableBoard() {
  var board = document.getElementById("game-board");
  var letters = board.getElementsByTagName("div");
  for (var i = 0; i < letters.length; i++) {
    letters[i].style.pointerEvents = "none";
    letters[i].style.opacity = "0.5";
  }
}

// Función para manejar el envío de palabras
function submitWord(event) {
  event.preventDefault();
  var wordInput = document.getElementById("word-input");
  var word = wordInput.value.toLowerCase().trim();

  if (word.length < 3) {
    showModal("La palabra debe tener al menos 3 letras");
    updateScore(-1); // Restar 1 punto por intento incorrecto
    return;
  }

  if (wordsFound.indexOf(word) !== -1) {
    showModal("Ya encontraste esa palabra");
    updateScore(-1); // Restar 1 punto por intento incorrecto
    return;
  }

  if (!validWords.includes(word)) {
    showModal("La palabra no es válida");
    updateScore(-1); // Restar 1 punto por intento incorrecto
    return;
  }

  if (isWordContiguous(word)) {
    wordsFound.push(word);
    updateScore(word.length); // Puntaje basado en la longitud de la palabra
    updateWordList(word);
    wordInput.value = "";
  } else {
    showModal("La palabra no es contigua en el tablero");
    updateScore(-1); // Restar 1 punto por intento incorrecto
  }
}

// Función para actualizar el puntaje
function updateScore(points) {
  score += points;
  if (score < 0) {
    score = 0; // Asegurar que el puntaje no sea negativo
  }
  document.getElementById("score").innerText = "Puntaje: " + score;
}

// Función para actualizar la lista de palabras encontradas
function updateWordList(word) {
  var wordList = document.getElementById("word-list");
  var listItem = document.createElement("li");
  listItem.innerText = word;
  wordList.appendChild(listItem);
}

// Función para validar la contigüidad de la palabra
function isWordContiguous(word) {
  var foundPath = [];
  var wordArray = word.split("");
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      if (boardLetters[i][j] === wordArray[0]) {
        if (searchWord(i, j, wordArray, 0, foundPath)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Función recursiva para buscar la palabra en el tablero
function searchWord(x, y, wordArray, index, path) {
  if (index === wordArray.length) return true;
  if (
    x < 0 ||
    y < 0 ||
    x >= boardSize ||
    y >= boardSize ||
    boardLetters[x][y] !== wordArray[index] ||
    path.includes(`${x},${y}`)
  )
    return false;

  path.push(`${x},${y}`);
  var directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  for (var i = 0; i < directions.length; i++) {
    var newX = x + directions[i][0];
    var newY = y + directions[i][1];
    if (searchWord(newX, newY, wordArray, index + 1, path)) {
      return true;
    }
  }
  path.pop();
  return false;
}

// Asignar manejadores de eventos
document.getElementById("player-form").addEventListener("submit", startGame);
document.getElementById("word-form").addEventListener("submit", submitWord);
