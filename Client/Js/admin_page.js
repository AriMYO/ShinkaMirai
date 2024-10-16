document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // Course registration form submission
    const courseForm = document.getElementById('courseForm');
    courseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Curso registrado exitosamente!');
        courseForm.reset();
    });

    // Video upload form submission
    const videoForm = document.getElementById('videoForm');
    videoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Video subido exitosamente!');
        videoForm.reset();
    });

    // User details button click event
    const userDetailButtons = document.querySelectorAll('.user-table .btn');
    userDetailButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Detalles del usuario: Esta funcionalidad está en desarrollo.');
        });
    });

    // Inbox item click event
    const inboxItems = document.querySelectorAll('.inbox-item');
    inboxItems.forEach(item => {
        item.addEventListener('click', () => {
            alert('Funcionalidad de visualización de mensaje en desarrollo.');
        });
    });

    // Messaging contact click event
    const messagingContacts = document.querySelectorAll('.messaging-contact');
    messagingContacts.forEach(contact => {
        contact.addEventListener('click', () => {
            messagingContacts.forEach(c => c.classList.remove('active'));
            contact.classList.add('active');
            alert('Cambio de conversación en desarrollo.');
        });
    });

    // Send message button click event
    const sendMessageBtn = document.querySelector('.messaging-footer .btn');
    sendMessageBtn.addEventListener('click', () => {
        const messageInput = document.querySelector('.messaging-footer input');
        if (messageInput.value.trim() !== '') {
            alert('Envío de mensaje en desarrollo.');
            messageInput.value = '';
        }
    });

    // Charts
    const accountsChart = new Chart(document.getElementById('accountsChart'), {
        type: 'bar',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Cuentas Creadas',
                    data: [65, 59, 80, 81, 56, 55],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
                {
                    label: 'Suscripciones Anuales',
                    data: [28, 48, 40, 19, 86, 27],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const userDistributionChart = new Chart(document.getElementById('userDistributionChart'), {
        type: 'pie',
        data: {
            labels: ['Estudiantes', 'Docentes', 'Administradores'],
            datasets: [{
                data: [300, 50, 10],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        options: {
            responsive: true,
        }
    });

    const incomeChart = new Chart(document.getElementById('incomeChart'), {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Ingresos ($)',
                data: [12000, 19000, 3000, 5000, 2000, 3000],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const scholarshipsChart = new Chart(document.getElementById('scholarshipsChart'), {
        type: 'bar',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Becas Otorgadas',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(153, 102, 255, 0.6)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});