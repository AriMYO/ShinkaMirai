// Define la URL base de la API al inicio del archivo
const API_BASE_URL = 'http://192.168.1.12:3000';

// Formulario de registro
document
  .getElementById("registration-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, password, fechaNacimiento }),
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message || "Error desconocido"}`);
        } else {
          const errorText = await response.text();
          throw new Error(`Error: ${errorText}`);
        }
      }

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        alert(data.message);
      } else {
        const textData = await response.text();
        alert(`Respuesta no JSON: ${textData}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con la solicitud: " + error.message);
    }
  });