document.addEventListener('DOMContentLoaded', () => {
  const courses = [
      { id: 1, title: "Desarrollo Web Fullstack", price: 299.99 },
      { id: 2, title: "Diseño UX/UI Avanzado", price: 249.99 },
      { id: 3, title: "Machine Learning y Data Science", price: 349.99 },
      { id: 4, title: "Desarrollo de Apps Móviles", price: 279.99 },
      { id: 5, title: "DevOps y Cloud Computing", price: 329.99 },
      { id: 6, title: "Ciberseguridad Empresarial", price: 299.99 },
  ];

  const courseGrid = document.getElementById('courseGrid');
  const cartIcon = document.querySelector('.cart');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.querySelector('.cart-count');
  const paymentAmount = document.getElementById('paymentAmount');

  let cart = [];

  function renderCourses() {
      courseGrid.innerHTML = '';
      courses.forEach(course => {
          const courseCard = document.createElement('div');
          courseCard.classList.add('course-card');
          courseCard.innerHTML = `
              <h2>${course.title}</h2>
              <p>Precio: S/ ${course.price.toFixed(2)}</p>
              <button data-id="${course.id}">Agregar al carrito</button>
          `;
          courseGrid.appendChild(courseCard);
      });
  }

  function updateCart() {
      cartItems.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.title} - S/ ${item.price.toFixed(2)}`;
          cartItems.appendChild(li);
          total += item.price;
      });
      cartTotal.textContent = total.toFixed(2);
      cartCount.textContent = cart.length;
      paymentAmount.textContent = total.toFixed(2);
  }

  courseGrid.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
          const courseId = parseInt(e.target.getAttribute('data-id'));
          const course = courses.find(c => c.id === courseId);
          if (course && !cart.some(item => item.id === course.id)) {
              cart.push(course);
              updateCart();
              e.target.disabled = true;
              e.target.textContent = 'Agregado';
          }
      }
  });

  const userMenu = document.querySelector('.user-menu img');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  userMenu.addEventListener('click', function(event) {
      event.stopPropagation();
      dropdownMenu.classList.toggle('show');
  });

  document.addEventListener('click', function(event) {
      if (!dropdownMenu.contains(event.target) && event.target !== userMenu) {
          dropdownMenu.classList.remove('show');
      }
  });

  // Navigation
  const navButtons = document.querySelectorAll('.nav-button');
  const views = document.querySelectorAll('.view');

  function showView(viewId) {
      views.forEach(view => {
          if (view.id === viewId + 'View') {
              view.classList.add('active');
          } else {
              view.classList.remove('active');
          }
      });
  }

  navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          e.preventDefault();
          const viewId = button.getAttribute('data-view');
          showView(viewId);
      });
  });

  // Form submissions
  const paymentForm = document.getElementById('paymentForm');

  paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Pago procesado exitosamente!');
      cart = [];
      updateCart();
      showView('courses');
  });

  // Plan selection
  const planButtons = document.querySelectorAll('.select-plan');
  planButtons.forEach(button => {
      button.addEventListener('click', () => {
          const planName = button.getAttribute('data-plan');
          alert(`Has seleccionado el plan ${planName}. ¡Gracias por tu preferencia!`);
      });
  });

  // Card number formatting
  window.formatCardNumber = function(input) {
      let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      let formattedValue = '';
      for (let i = 0; i < value.length; i++) {
          if (i > 0 && i % 4 === 0) {
              formattedValue += ' ';
          }
          formattedValue += value[i];
      }
      input.value = formattedValue;
  }

  // Date formatting
  window.formatDate = function(input) {
      let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      if (value.length > 2) {
          value = value.slice(0, 2) + ' / ' + value.slice(2);
      }
      input.value = value;
  }

  renderCourses();
  updateCart();
  showView('courses');
});