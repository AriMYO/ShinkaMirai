document
  .querySelector(".btn-login")
  .addEventListener("click", async (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const edad = parseInt(document.getElementById("edad").value); // Convierte a número

    // Verificar que edad no sea NaN
    if (isNaN(edad)) {
      alert("Por favor, selecciona una edad válida.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, password, edad }), // Enviar como número
      });

      if (!response.ok) {
        const errorData = await response.json(); // Cambia a .json() si el servidor devuelve JSON
        throw new Error(`Error: ${errorData.message || "Error desconocido"}`);
      }

      const data = await response.json(); // Cambia a .json() si el servidor devuelve JSON
      alert(data.message); // Muestra el mensaje de respuesta
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con la solicitud: " + error.message);
    }
  });
