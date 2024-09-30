function verificarRespuesta(button) {
    // Obtener todas las opciones
    const botones = document.querySelectorAll("button[name='q1']");
    
    // Limpiar todos los botones antes de aplicar estilos
    botones.forEach(btn => {
        btn.classList.remove('correcto', 'incorrecto');
    });

    // Verificar si la respuesta es correcta o incorrecta
    if (button.value === "correcto") {
        button.classList.add('correcto');
        document.getElementById('mensaje1').textContent = "¡Es correcto!";
    } else {
        button.classList.add('incorrecto');
        document.getElementById('mensaje1').textContent = "Respuesta incorrecta.";
    }
} 
