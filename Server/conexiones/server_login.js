document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
