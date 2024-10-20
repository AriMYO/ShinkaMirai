document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        { id: 1, title: "Desarrollo Web Fullstack", price: 299.99 },
        { id: 2, title: "Diseño UX/UI Avanzado", price: 249.99 },
        { id: 3, title: "Machine Learning y Data Science", price: 349.99 },
        { id: 4, title: "Desarrollo de Apps Móviles", price: 279.99 },
        { id: 5, title: "DevOps y Cloud Computing", price: 329.99 },
        { id: 6, title: "Ciberseguridad Empresarial", price: 299.99 },
    ];

    const plans = [
        { id: 'basico', title: "Plan Básico", price: 200 },
        { id: 'duo', title: "Plan Duo", price: 350 },
        { id: 'expert', title: "Plan Expert", price: 500 },
    ];

    const courseGrid = document.getElementById('courseGrid');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    const paymentAmount = document.getElementById('paymentAmount');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartToggle = document.getElementById('cartToggle');
    const checkoutButton = document.getElementById('checkoutButton');
    const purchaseItems = document.getElementById('purchaseItems');
    const purchaseTotal = document.getElementById('purchaseTotal');

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
        purchaseItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
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

    function addToCart(item) {
        if (!cart.some(cartItem => cartItem.id === item.id)) {
            cart.push(item);
            updateCart();
        }
    }

    courseGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const courseId = parseInt(e.target.getAttribute('data-id'));
            const course = courses.find(c => c.id === courseId);
            if (course) {
                addToCart(course);
                e.target.disabled = true;
                e.target.textContent = 'Agregado';
            }
        }
    });

    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCart();
        }
    });

    const planButtons = document.querySelectorAll('.select-plan');
    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            const planId = button.getAttribute('data-plan');
            const plan = plans.find(p => p.id === planId);
            if (plan) {
                addToCart(plan);
                button.disabled = true;
                button.textContent = 'Agregado';
            }
        });
    });

    cartToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        cartSidebar.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target) && cartSidebar.classList.contains('open')) {
            cartSidebar.classList.remove('open');
        }
    });

    checkoutButton.addEventListener('click', () => {
        showView('payment');
        cartSidebar.classList.remove('open');
    });

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

    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Pago procesado exitosamente!');
        cart = [];
        updateCart();
        showView('courses');
    });

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

    window.formatDate = function(input) {
        let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + ' / ' + value.slice(2);
        }
        input.value = value;
    }

    document.getElementById('documento').addEventListener('input', function (e) {
        this.value = this.value.replace(/\D/g, '');
    });

    renderCourses();
    updateCart();
    showView('courses');
});