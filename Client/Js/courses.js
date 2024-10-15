document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        { id: 1, title: "Curso de Configuración de Entorno de Desarrollo en Windows", price: 29.99 },
        { id: 2, title: "Curso de Configuración de Entorno de Desarrollo en Linux", price: 29.99 },
        { id: 3, title: "Curso de Configuración de Entorno de Desarrollo en macOS", price: 29.99 },
        { id: 4, title: "Curso de Introducción a la Terminal y Línea de Comandos", price: 19.99 },
        { id: 5, title: "Curso Profesional de Git y GitHub", price: 39.99 },
        { id: 6, title: "Curso de Frontend Developer", price: 49.99 },
        { id: 7, title: "Curso de Backend Developer", price: 49.99 },
        { id: 8, title: "Curso de Full Stack Developer", price: 49.99 },
        { id: 9, title: "Curso de DevOps", price: 49.99 },
        { id: 10, title: "Curso de Sistemas Operativos", price: 49.99 },
    ];

    const courseGrid = document.getElementById('courseGrid');
    const cartIcon = document.querySelector('.cart');
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    const closeCart = document.getElementById('closeCart');

    let cart = [];

    function renderCourses() {
        courseGrid.innerHTML = '';
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            courseCard.innerHTML = `
                <h2>${course.title}</h2>
                <p>Precio: $${course.price.toFixed(2)}</p>
                <button data-id="${course.id}">Comprar curso</button>
            `;
            courseGrid.appendChild(courseCard);
        });
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.title} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price;
        });
        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
    }

    courseGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const courseId = parseInt(e.target.getAttribute('data-id'));
            const course = courses.find(c => c.id === courseId);
            if (course) {
                cart.push(course);
                updateCart();
            }
        }
    });

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    renderCourses();
    updateCart();
});

document.addEventListener('DOMContentLoaded', function() {
    const userMenu = document.querySelector('.user-menu img');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    userMenu.addEventListener('click', function(event) {
        event.stopPropagation(); // Evita que el clic se propague al documento
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        if (!dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});
