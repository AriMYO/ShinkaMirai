document.addEventListener('DOMContentLoaded', function() {
    const startCourseButtons = document.querySelectorAll('.start-course, .course-cta button');
    
    startCourseButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('¡Bienvenido al Curso de Python! Estás a punto de comenzar tu viaje de aprendizaje.');
        });
    });

    const userMenu = document.querySelector('.user-menu');
    userMenu.addEventListener('click', function() {
        alert('Aquí podrías ver tu perfil, tus cursos y cerrar sesión.');
    });

    const searchBar = document.querySelector('.search-bar input');
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            alert(`Buscando: ${this.value}`);
        }
    });
});