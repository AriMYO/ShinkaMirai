const API_BASE_URL = "http://192.168.1.12:3000";

// Función para extraer el nombre del email
function getNameFromEmail(email) {
  return email.split("@")[0];
}

// Función para verificar si hay datos de usuario guardados
function checkExistingSession() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  if (userId && userName) {
    window.location.href = "/Client/pages/Home/home.html";
  }
}

// Verificar sesión al cargar la página
document.addEventListener("DOMContentLoaded", checkExistingSession);

// Manejar el formulario de login
document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      console.log("Intentando login con:", { email }); // Debug

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Respuesta recibida:", response.status); // Debug

      // Manejar errores de respuesta
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Error en el inicio de sesión");
      }

      // Procesar respuesta exitosa
      const data = await response.json();
      console.log("Datos recibidos:", data); // Debug

      // Guardar datos del usuario
      const userName = data.nombre || getNameFromEmail(email);
      const userId = data.id || Date.now().toString();

      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", data.role || "user");

      console.log("Datos guardados en localStorage:", {
        userName,
        userId,
        email,
      }); // Debug

      // Verificar que los datos se guardaron correctamente
      const savedUserName = localStorage.getItem("userName");
      if (!savedUserName) {
        throw new Error("Error al guardar los datos del usuario");
      }

      // Redirigir al home
      window.location.href = "/Client/pages/Home/home.html";
    } catch (error) {
      console.error("Error durante el login:", error);

      // Mostrar error al usuario
      const errorMessage = error.message || "Error durante el inicio de sesión";
      alert(errorMessage);

      // Limpiar campos en caso de error
      document.getElementById("password").value = "";
    }
  });

// Función para cerrar sesión (puede ser llamada desde cualquier parte)
function logout() {
  localStorage.clear();
  window.location.href = "/Client/pages/login.html";
}

// Exportar funciones si es necesario
window.logout = logout;
