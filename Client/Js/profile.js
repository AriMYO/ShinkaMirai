  // Mostrar u ocultar el menú desplegable de opciones 
  const pikachu = document.querySelector(".user-menu img");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  pikachu.addEventListener("mouseover", () => {
      dropdownMenu.style.display = 'block';
  });

  pikachu.addEventListener("mouseout", () => {
      dropdownMenu.style.display = 'none';
  });

  // Cerrar menú de opciones si se hace clic fuera
  document.addEventListener("click", (e) => {
      if (!pikachu.parentElement.contains(e.target) && dropdownMenu.style.display === 'block') {
          dropdownMenu.style.display = 'none';
      }
  });