document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.view');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const viewId = this.getAttribute('data-view');
            
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            views.forEach(view => {
                if (view.id === viewId) {
                    view.classList.add('active');
                } else {
                    view.classList.remove('active');
                }
            });
        });
    });

    // Chat functionality
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendButton.addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            messageInput.value = '';
            
            // Simulate admin response
            setTimeout(() => {
                addMessage('Gracias por tu mensaje. Un administrador te responderá pronto.', 'admin');
            }, 1000);
        }
    });

    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});


// Ejemplo de cómo actualizar la barra de racha
const streakCount = 11; // Número de semanas en racha
const streakWeeks = document.querySelectorAll('.streak-week');

streakWeeks.forEach((week, index) => {
  if (index < streakCount) {
    week.classList.add('completed');
  }
});

// Agregar evento de clic al logo de racha
document.getElementById('streakLogo').addEventListener('click', function(event) {
  const streakInfo = document.getElementById('streakInfo');
  const streakDays = document.getElementById('streakDays');
  const streakFire = document.getElementById('streakFire');

  // Example logic to update streak days and fire intensity
  let days = parseInt(streakDays.textContent, 10);
  days += 1; // Increment streak days for demonstration
  streakDays.textContent = days;

  // Update fire intensity based on streak days
  if (days < 5) {
    streakFire.textContent = '🔥';
  } else if (days < 10) {
    streakFire.textContent = '🔥🔥';
  } else {
    streakFire.textContent = '🔥🔥🔥';
  }

  // Toggle visibility of streak info
  streakInfo.style.display = streakInfo.style.display === 'none' ? 'block' : 'none';

  // Stop the event from propagating to the document
  event.stopPropagation();
});

// Close the streak info when clicking outside
document.addEventListener('click', function(event) {
  const streakInfo = document.getElementById('streakInfo');
  const streakLogo = document.getElementById('streakLogo');

  if (streakInfo.style.display === 'block' && !streakLogo.contains(event.target)) {
    streakInfo.style.display = 'none';
  }
});
