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
    alert("El nombre debe tener al menos 3 letras");
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
  alert("El tiempo se ha acabado!");
  // Lógica para finalizar el juego
}

// Asignar manejadores de eventos
document.getElementById("player-form").addEventListener("submit", startGame);
