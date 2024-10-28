document.addEventListener("DOMContentLoaded", function () {
  // Configuración de socket.io
  const socket = io("http://localhost:3000");
  let userId = localStorage.getItem("userId") || Date.now().toString();

  // Funciones de navegación
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

  // Configuración del nombre de usuario
  const userName = localStorage.getItem("userName");
  if (userName) {
    const userNameElement = document.querySelector(".home-dropdown-menu span");
    userNameElement.textContent = userName;
  }

  // Funciones de chat
  function initializeUserChat() {
    // Guardar el ID de usuario si no existe
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", userId);
    }

    // Cargar historial de mensajes
    socket.emit("getMessageHistory", userId);

    // Escuchar nuevos mensajes
    socket.on(`message:${userId}`, (message) => {
      appendMessage(message);
    });

    // Configurar envío de mensajes
    document
      .getElementById("sendMessage")
      .addEventListener("click", sendUserMessage);
    document
      .getElementById("messageInput")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendUserMessage();
        }
      });

    // Cargar mensajes anteriores
    socket.on("messageHistory", (messages) => {
      const chatMessages = document.getElementById("chatMessages");
      chatMessages.innerHTML = "";
      messages.forEach((message) => appendMessage(message));
    });
  }

  function appendMessage(message) {
    const chatMessages = document.getElementById("chatMessages");
    const messageElement = document.createElement("div");
    messageElement.classList.add(
      "message",
      message.from === userId ? "sent" : "received"
    );

    messageElement.innerHTML = `
      <div class="message-content">
        <p>${message.content}</p>
        <span class="message-time">${new Date(
          message.timestamp
        ).toLocaleTimeString()}</span>
      </div>
    `;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendUserMessage() {
    const input = document.getElementById("messageInput");
    const content = input.value.trim();

    if (content) {
      const message = {
        from: userId,
        to: "admin",
        content: content,
      };

      socket.emit("sendMessage", message);
      input.value = "";
    }
  }

  // Configuración de la racha
  const streakCount = 11; // Número de semanas en racha
  const streakWeeks = document.querySelectorAll(".streak-week");

  streakWeeks.forEach((week, index) => {
    if (index < streakCount) {
      week.classList.add("completed");
    }
  });

  // Eventos de racha
  document
    .getElementById("streakLogo")
    .addEventListener("click", function (event) {
      const streakInfo = document.getElementById("streakInfo");
      const streakDays = document.getElementById("streakDays");
      const streakFire = document.getElementById("streakFire");

      let days = parseInt(streakDays.textContent, 10);
      days += 1;
      streakDays.textContent = days;

      if (days < 5) {
        streakFire.textContent = "🔥";
      } else if (days < 10) {
        streakFire.textContent = "🔥🔥";
      } else {
        streakFire.textContent = "🔥🔥🔥";
      }

      streakInfo.style.display =
        streakInfo.style.display === "none" ? "block" : "none";

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

  // Inicializar todas las funcionalidades
  initializeUserChat();
});
