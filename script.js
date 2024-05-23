// script.js
"use strict";

// Variables globales
var timer;
var score = 0;
var wordsFound = [];

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
  // Lógica para llenar el tablero con letras aleatorias
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

// Asignar manejadores de eventos
document.getElementById("player-form").addEventListener("submit", startGame);
