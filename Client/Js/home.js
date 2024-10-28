document.addEventListener("DOMContentLoaded", function () {
  // Configuración inicial de socket.io y variables globales
  const socket = io("http://localhost:3000");
  let userId = localStorage.getItem("userId") || Date.now().toString();
  const userName = localStorage.getItem("userName");

  // Funciones de Navegación
  function setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const views = document.querySelectorAll(".view");

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const viewId = this.getAttribute("data-view");

        // Actualizar clases activas
        navLinks.forEach((link) => link.classList.remove("active"));
        this.classList.add("active");

        // Mostrar/ocultar vistas
        views.forEach((view) => {
          view.classList.toggle("active", view.id === viewId);
        });
      });
    });
  }

  // Configuración del Perfil de Usuario
  function setupUserProfile() {
    if (userName) {
      const userNameElement = document.querySelector(
        ".home-dropdown-menu span"
      );
      if (userNameElement) {
        userNameElement.textContent = userName;
      }
    }
  }

  // Funciones del Chat
  function initializeUserChat() {
    // Inicialización del ID de usuario
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", userId);
    }

    // Verificación del nombre de usuario
    if (!userName) {
      console.warn("Nombre de usuario no encontrado en localStorage");
    }

    // Configurar eventos del socket
    setupSocketEvents();

    // Configurar eventos de la interfaz del chat
    setupChatInterface();

    // Cargar historial inicial
    socket.emit("getMessageHistory", userId);
  }

  function setupSocketEvents() {
    // Escuchar mensajes nuevos específicos para este usuario
    socket.on(`message:${userId}`, (message) => {
      appendMessage(message);
    });

    // Escuchar historial de mensajes
    socket.on("messageHistory", (messages) => {
      const chatMessages = document.getElementById("chatMessages");
      chatMessages.innerHTML = "";
      messages.forEach((message) => appendMessage(message));
    });
  }

  function setupChatInterface() {
    // Configurar botón de envío
    const sendButton = document.getElementById("sendMessage");
    if (sendButton) {
      sendButton.addEventListener("click", sendUserMessage);
    }

    // Configurar entrada de texto
    const messageInput = document.getElementById("messageInput");
    if (messageInput) {
      messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendUserMessage();
        }
      });
    }
  }

  function appendMessage(message) {
    const chatMessages = document.getElementById("chatMessages");
    if (!chatMessages) return;

    const messageElement = document.createElement("div");
    const isUser = message.from === userId;

    messageElement.classList.add("message", isUser ? "sent" : "received");

    messageElement.innerHTML = `
          <div class="message-content">
              <div class="message-bubble">
                  <p>${message.content}</p>
              </div>
              <span class="message-time">
                  ${isUser ? userName : "Admin"} - 
                  ${new Date(message.timestamp).toLocaleTimeString()}
              </span>
          </div>
      `;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendUserMessage() {
    const input = document.getElementById("messageInput");
    if (!input) return;

    const content = input.value.trim();

    if (content) {
      const message = {
        from: userId,
        to: "admin",
        content: content,
        userName: userName, // Incluir nombre del usuario en cada mensaje
        timestamp: new Date(),
      };

      socket.emit("sendMessage", message);
      input.value = "";
    }
  }

  // Funciones de Racha (Streak)
  function setupStreak() {
    const streakCount = 11; // Configurable: número de semanas en racha
    const streakWeeks = document.querySelectorAll(".streak-week");

    // Marcar semanas completadas
    streakWeeks.forEach((week, index) => {
      if (index < streakCount) {
        week.classList.add("completed");
      }
    });

    setupStreakEvents();
  }

  function setupStreakEvents() {
    const streakLogo = document.getElementById("streakLogo");

    // Evento de clic en el logo de racha
    if (streakLogo) {
      streakLogo.addEventListener("click", handleStreakClick);
    }

    // Cerrar información de racha al hacer clic fuera
    document.addEventListener("click", handleOutsideClick);
  }

  function handleStreakClick(event) {
    const streakInfo = document.getElementById("streakInfo");
    const streakDays = document.getElementById("streakDays");
    const streakFire = document.getElementById("streakFire");

    if (streakInfo && streakDays && streakFire) {
      let days = parseInt(streakDays.textContent, 10);
      days += 1;
      streakDays.textContent = days;

      // Actualizar indicador de fuego según los días
      streakFire.textContent = days < 5 ? "🔥" : days < 10 ? "🔥🔥" : "🔥🔥🔥";

      streakInfo.style.display =
        streakInfo.style.display === "none" ? "block" : "none";
    }

    event.stopPropagation();
  }

  function handleOutsideClick(event) {
    const streakInfo = document.getElementById("streakInfo");
    const streakLogo = document.getElementById("streakLogo");

    if (
      streakInfo &&
      streakLogo &&
      streakInfo.style.display === "block" &&
      !streakLogo.contains(event.target)
    ) {
      streakInfo.style.display = "none";
    }
  }

  // Inicialización de la Aplicación
  function initializeApp() {
    setupNavigation();
    setupUserProfile();
    initializeUserChat();
    setupStreak();
  }

  // Iniciar la aplicación
  initializeApp();
});
