// Inicialización de la página y configuración de eventos principales
document.addEventListener("DOMContentLoaded", () => {

    // Cursos y planes predefinidos
    const courses = [
      { id: 1, title: "Desarrollo Web Fullstack", price: 299.99 },
      { id: 2, title: "Diseño UX/UI Avanzado", price: 249.99 },
      { id: 3, title: "Machine Learning y Data Science", price: 349.99 },
      { id: 4, title: "Desarrollo de Apps Móviles", price: 279.99 },
      { id: 5, title: "DevOps y Cloud Computing", price: 329.99 },
      { id: 6, title: "Ciberseguridad Empresarial", price: 299.99 },
    ];
  
    const plans = [
      { id: "basico", title: "Plan Básico", price: 200 },
      { id: "duo", title: "Plan Duo", price: 350 },
      { id: "expert", title: "Plan Expert", price: 500 },
    ];
  
    // Elementos de la página para manipulación del DOM
    const courseGrid = document.getElementById("courseGrid");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.querySelector(".cart-count");
    const paymentAmount = document.getElementById("paymentAmount");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartToggle = document.getElementById("cartToggle");
    const checkoutButton = document.getElementById("checkoutButton");
    const purchaseItems = document.getElementById("purchaseItems");
    const purchaseTotal = document.getElementById("purchaseTotal");
    const searchInput = document.querySelector(".search-bar input");
  
    // Creación del contenedor de resultados de búsqueda
    const searchResults = document.createElement("div");
    searchResults.classList.add("search-results");
    document.querySelector(".search-bar").appendChild(searchResults);
  
    let cart = [];
  
    // Función para renderizar los cursos en el grid
    function renderCourses(coursesToRender = courses) {
      courseGrid.innerHTML = "";
      coursesToRender.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        courseCard.innerHTML = `
                  <h2>${course.title}</h2>
                  <p>Precio: S/ ${course.price.toFixed(2)}</p>
                  <button data-id="${course.id}">Agregar al carrito</button>
              `;
        courseGrid.appendChild(courseCard);
      });
    }
  
    // Función para actualizar el contenido del carrito de compras
    function updateCart() {
      cartItems.innerHTML = "";
      purchaseItems.innerHTML = "";
      let total = 0;
  
      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
                  ${item.title} - S/ ${item.price.toFixed(2)}
                  <button class="remove-item" data-index="${index}">Eliminar</button>
              `;
        cartItems.appendChild(li);
        purchaseItems.appendChild(li.cloneNode(true));
        total += item.price;
      });
  
      cartTotal.textContent = total.toFixed(2);
      purchaseTotal.textContent = total.toFixed(2);
      cartCount.textContent = cart.length;
      paymentAmount.textContent = total.toFixed(2);
    }
  
    // Función para agregar un curso o plan al carrito
    function addToCart(item) {
      if (!cart.some((cartItem) => cartItem.id === item.id)) {
        cart.push(item);
        updateCart();
      }
    }
  
    // Función para realizar la búsqueda de cursos
    function performSearch(searchTerm) {
      const results = courses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      searchResults.innerHTML = "";
      if (results.length > 0) {
        results.forEach((course) => {
          const resultItem = document.createElement("div");
          resultItem.classList.add("search-result-item");
          resultItem.innerHTML = `
                      <p>${course.title}</p>
                      <p>S/ ${course.price.toFixed(2)}</p>
                  `;
          resultItem.addEventListener("click", () => {
            showCourseDetails(course);
            searchInput.value = "";
          });
          searchResults.appendChild(resultItem);
        });
      } else {
        searchResults.innerHTML = "<p>No se encontraron resultados</p>";
      }
      searchResults.style.display = "block";
    }
  
    // Event listener para la barra de búsqueda
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.trim();
      if (searchTerm.length > 0) {
        performSearch(searchTerm);
      } else {
        searchResults.innerHTML = "";
        searchResults.style.display = "none";
      }
    });
  
    // Event listener para seleccionar resultados de búsqueda
    searchResults.addEventListener("click", (e) => {
      if (e.target.closest(".search-result-item")) {
        const courseId = parseInt(
          e.target.closest(".search-result-item").getAttribute("data-id")
        );
        const course = courses.find((c) => c.id === courseId);
        if (course) {
          showCourseDetails(course);
          searchInput.value = "";
        }
      }
    });
  
    // Ocultar resultados de búsqueda al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = "none";
      }
    });
  
    // Event listener para agregar curso al carrito desde el grid
    courseGrid.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const courseId = parseInt(e.target.getAttribute("data-id"));
        const course = courses.find((c) => c.id === courseId);
        if (course) {
          addToCart(course);
          e.target.disabled = true;
          e.target.textContent = "Agregado";
        }
      }
    });
  
    // Event listener para eliminar un ítem del carrito
    cartItems.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        cart.splice(index, 1);
        updateCart();
      }
    });
  
    // Event listener para seleccionar plan
    const planButtons = document.querySelectorAll(".select-plan");
    planButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const planId = button.getAttribute("data-plan");
        const plan = plans.find((p) => p.id === planId);
        if (plan) {
          addToCart(plan);
          button.disabled = true;
          button.textContent = "Agregado";
        }
      });
    });
  
    // Event listener para alternar el carrito de compras (abrir/cerrar)
    cartToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      cartSidebar.classList.toggle("open");
    });
  
    // Cerrar carrito si se hace clic fuera del área
    document.addEventListener("click", (e) => {
      if (
        !cartSidebar.contains(e.target) &&
        !cartToggle.contains(e.target) &&
        cartSidebar.classList.contains("open")
      ) {
        cartSidebar.classList.remove("open");
      }
    });
  
    // Event listener para el botón de pago/checkout
    checkoutButton.addEventListener("click", () => {
      showView("payment");
      cartSidebar.classList.remove("open");
    });
  
    // Navegación entre vistas (cursos, pagos, etc.)
    const navButtons = document.querySelectorAll(".nav-button");
    const views = document.querySelectorAll(".view");
  
    function showView(viewId) {
      views.forEach((view) => {
        if (view.id === viewId + "View") {
          view.classList.add("active");
        } else {
          view.classList.remove("active");
        }
      });
    }
  
    // Event listeners para cambiar de vista
    navButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const viewId = button.getAttribute("data-view");
        showView(viewId);
      });
    });
  
    // Event listener para el formulario de pago
    const paymentForm = document.getElementById("paymentForm");
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("¡Pago procesado exitosamente!");
      cart = [];
      updateCart();
      showView("courses");
    });
  
    // Función para formatear número de tarjeta de crédito
    window.formatCardNumber = function (input) {
      let value = input.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      let formattedValue = "";
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += " ";
        }
        formattedValue += value[i];
      }
      input.value = formattedValue;
    };
  
    // Función para formatear la fecha de la tarjeta (MM/AA)
    window.formatDate = function (input) {
      let value = input.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      if (value.length > 2) {
        value = value.slice(0, 2) + " / " + value.slice(2);
      }
      input.value = value;
    };
  
    // Limitar la entrada a solo números para el campo de documento
    document.getElementById("documento").addEventListener("input", function (e) {
      this.value = this.value.replace(/\D/g, "");
    });
  
    // Mostrar u ocultar el menú desplegable de usuario
    const userMenu = document.querySelector(".user-menu");
    const dropdownMenu = document.querySelector(".dropdown-menu");
  
    userMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("show");
    });
  
    // Cerrar menú desplegable si se hace clic fuera
    document.addEventListener("click", (e) => {
      if (!userMenu.contains(e.target) && dropdownMenu.classList.contains("show")) {
        dropdownMenu.classList.remove("show");
      }
    });
  
    // Mostrar detalles de un curso seleccionado
    function showCourseDetails(course) {
      const courseDetailsContainer = document.getElementById("courseDetails");
      courseDetailsContainer.innerHTML = `
              <h2>${course.title}</h2>
              <p>Precio: S/ ${course.price.toFixed(2)}</p>
              <button data-id="${course.id}">Agregar al carrito</button>
          `;
      courseDetailsContainer.classList.add("active");
      showView("courseDetails");
  
      const addButton = courseDetailsContainer.querySelector("button");
      addButton.addEventListener("click", () => {
        addToCart(course);
        addButton.disabled = true;
        addButton.textContent = "Agregado";
      });
    }
  
    // Renderizar los cursos inicialmente y actualizar el carrito
    renderCourses();
    updateCart();
    showView("plans");
  
    // Mostrar u ocultar el menú desplegable de opciones 
    const pikachu = document.querySelector(".pikachu");
    const optionsMenu = document.getElementById("optionsMenu");

    pikachu.addEventListener("mouseover", () => {
        optionsMenu.style.display = 'block';
    });

    pikachu.addEventListener("mouseout", () => {
        optionsMenu.style.display = 'none';
    });

    // Cerrar menú de opciones si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!pikachu.contains(e.target) && optionsMenu.style.display === 'block') {
            optionsMenu.style.display = 'none';
        }
    });
});
