document.addEventListener('DOMContentLoaded', function() {
    // Función para manejar el clic en los elementos del menú
    function handleMenuClick(event) {
        event.preventDefault();
        const menuItems = document.querySelectorAll('.sidebar nav ul li a');
        menuItems.forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
    }

    // Agregar event listeners a los elementos del menú
    const menuItems = document.querySelectorAll('.sidebar nav ul li a');
    menuItems.forEach(item => item.addEventListener('click', handleMenuClick));

    // Función para manejar la búsqueda
    function handleSearch(event) {
        event.preventDefault();
        const searchInput = document.querySelector('.search-bar input');
        alert(`Buscando: ${searchInput.value}`);
        searchInput.value = '';
    }

    // Agregar event listener al botón de búsqueda
    const searchButton = document.querySelector('.search-icon');
    searchButton.addEventListener('click', handleSearch);

    // Función para manejar el clic en el botón CTA
    function handleCTAClick() {
        alert('¡Comenzando tu ruta de aprendizaje!');
    }

    // Agregar event listener al botón CTA
    const ctaButton = document.querySelector('.cta-btn');
    ctaButton.addEventListener('click', handleCTAClick);

    // Función para manejar el clic en el botón de suscripción
    function handleSubscriptionClick() {
        alert('Redirigiendo a la página de planes...');
    }

    // Agregar event listener al botón de suscripción
    const subButton = document.querySelector('.sub-btn');
    subButton.addEventListener('click', handleSubscriptionClick);
});