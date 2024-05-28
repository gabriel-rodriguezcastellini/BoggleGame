document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    var mailtoLink = `mailto:destinatario@example.com?subject=Mensaje de ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(message)}%0A%0ACorreo: ${encodeURIComponent(
      email
    )}`;

    window.location.href = mailtoLink;
  });
