document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const views = document.querySelectorAll(".view");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const viewId = this.getAttribute("data-view");

      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");

      views.forEach((view) => {
        if (view.id === viewId) {
          view.classList.add("active");
        } else {
          view.classList.remove("active");
        }
      });
    });
  });

  // Mostrar el nombre del usuario
  const userName = localStorage.getItem("userName");
  if (userName) {
    const userNameElement = document.querySelector(".home-dropdown-menu span");
    userNameElement.textContent = userName;
  }

  // Funcionalidad del chat
  const chatMessages = document.getElementById("chatMessages");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendMessage");

  function addMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  sendButton.addEventListener("click", function () {
    const message = messageInput.value.trim();
    if (message) {
      addMessage(message, "user");
      messageInput.value = "";

      // Simular respuesta del administrador
      setTimeout(() => {
        addMessage(
          "Gracias por tu mensaje. Un administrador te responderá pronto.",
          "admin"
        );
      }, 1000);
    }
  });

  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendButton.click();
    }
  });

  // Ejemplo de cómo actualizar la barra de racha
  const streakCount = 11; // Número de semanas en racha
  const streakWeeks = document.querySelectorAll(".streak-week");

  streakWeeks.forEach((week, index) => {
    if (index < streakCount) {
      week.classList.add("completed");
    }
  });

  // Agregar evento de clic al logo de racha
  document
    .getElementById("streakLogo")
    .addEventListener("click", function (event) {
      const streakInfo = document.getElementById("streakInfo");
      const streakDays = document.getElementById("streakDays");
      const streakFire = document.getElementById("streakFire");

      // Lógica de ejemplo para actualizar los días de racha y la intensidad del fuego
      let days = parseInt(streakDays.textContent, 10);
      days += 1; // Incrementar días de racha para demostración
      streakDays.textContent = days;

      // Actualizar intensidad del fuego según los días de racha
      if (days < 5) {
        streakFire.textContent = "🔥";
      } else if (days < 10) {
        streakFire.textContent = "🔥🔥";
      } else {
        streakFire.textContent = "🔥🔥🔥";
      }

      // Alternar visibilidad de la información de racha
      streakInfo.style.display =
        streakInfo.style.display === "none" ? "block" : "none";

      // Detener la propagación del evento al documento
      event.stopPropagation();
    });

  // Cerrar la información de racha al hacer clic fuera
  document.addEventListener("click", function (event) {
    const streakInfo = document.getElementById("streakInfo");
    const streakLogo = document.getElementById("streakLogo");

    if (
      streakInfo.style.display === "block" &&
      !streakLogo.contains(event.target)
    ) {
      streakInfo.style.display = "none";
    }
  });
});
