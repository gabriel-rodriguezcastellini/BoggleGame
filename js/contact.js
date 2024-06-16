document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var modal = document.getElementById("modal");
    var modalMessage = document.getElementById("modal-message");
    var namePattern = /^[a-zA-Z0-9\s]+$/;

    if (!namePattern.test(name)) {
      modalMessage.innerText = "El nombre debe ser alfanumérico.";
      modal.style.display = "block";
      return;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      modalMessage.innerText =
        "Por favor, introduce un correo electrónico válido.";
      modal.style.display = "block";
      return;
    }

    if (message.length < 5) {
      modalMessage.innerText = "El mensaje debe tener más de 5 caracteres.";
      modal.style.display = "block";
      return;
    }

    var mailtoLink = `mailto:gabriel.rodriguezcastellini@outlook.com?subject=Mensaje de ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(message)}%0A%0ACorreo: ${encodeURIComponent(
      email
    )}`;
    window.location.href = mailtoLink;
  });

document
  .getElementsByClassName("close-button")[0]
  .addEventListener("click", function () {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
  });

window.addEventListener("click", function (event) {
  var modal = document.getElementById("modal");

  if (event.target == modal) {
    modal.style.display = "none";
  }
});
