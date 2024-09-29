
        function calcularResultado() {
            let correctas = 0;

            // Verificar las respuestas correctas
            if (document.querySelector('button[name="q1"]:checked').value === "correcto") {
                correctas++;
            }
           

            // Mostrar el resultado
            let resultadoDiv = document.getElementById("resultado");
            resultadoDiv.style.display = "block";
            resultadoDiv.innerHTML = "Respuestas correctas: " + correctas + " de 3";
        }
  