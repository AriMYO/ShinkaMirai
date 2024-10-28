// Define la URL base de la API al inicio del archivo
const API_BASE_URL = "http://192.168.1.12:3000";

// Formulario de inicio de sesión
document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          localStorage.setItem("userName", data.userName);
          localStorage.setItem("userId", data.userId); // Asegúrate que el backend envíe el userId
          alert(data.message);
          window.location.href = "/Client/pages/Home/home.html";
        } else {
          const errorText = await response.text();
          throw new Error(`Error: ${errorText}`);
        }
      }

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        localStorage.setItem("userName", data.userName); // Guarda el nombre del usuario
        alert(data.message);
        window.location.href = "/Client/pages/Home/home.html"; // Redirige a la página principal
      } else {
        const textData = await response.text();
        alert(`Respuesta no JSON: ${textData}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con la solicitud: " + error.message);
    }
  });
