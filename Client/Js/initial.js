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
    document.getElementById('texto-mensaje').textContent = "¡La respuesta es correcta!";
    document.getElementById('continuar').style.display = 'inline-block';
  } else {
    button.classList.add('incorrecto');
    document.getElementById('texto-mensaje').textContent = "La respuesta es incorrecta.";
    document.getElementById('continuar').style.display = 'none';
  }
}
const paises = [
  { codigo: "AR", nombre: "Argentina" },
  { codigo: "BO", nombre: "Bolivia" },
  { codigo: "CL", nombre: "Perú" },
  // añadimos el resto de los países aquí
];
//selector para la edad
document.getElementById('edad').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
  if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
  if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
  e.target.value = value;
});

 // seleccionar para la tarjeta de credito
const selectPais = document.getElementById('pais');

paises.forEach(pais => {
  const option = document.createElement('option');
  option.value = pais.codigo;
  option.textContent = pais.nombre;
  selectPais.appendChild(option);
});

function formatCardNumber(input) {
  input.value = input.value
    .replace(/\D/g, "")
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
}

function formatDate(input) {
  input.value = input.value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2");
}