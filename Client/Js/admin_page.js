document.addEventListener('DOMContentLoaded', () => {
    const plans = [
        { name: 'Básico', price: 200, students: 1, color: 'rgb(255, 99, 132)' },
        { name: 'Duo', price: 350, students: 2, color: 'rgb(54, 162, 235)' },
        { name: 'Expert', price: 500, students: 4, color: 'rgb(255, 206, 86)' }
    ];

    const initialStats = {
        users: [500, 300, 200],
        revenue: [100000, 105000, 100000],
        retention: [85, 90, 95],
        courses: [50, 75, 100]
    };

    let selectedPlans = ['Básico', 'Duo', 'Expert'];
    let currentTab = 'users';
    let charts = {};

    function initCharts() {
        const ctx = {
            users: document.getElementById('usersChart').getContext('2d'),
            revenue: document.getElementById('revenueChart').getContext('2d'),
            retention: document.getElementById('retentionChart').getContext('2d'),
            courses: document.getElementById('coursesChart').getContext('2d')
        };

        Object.keys(ctx).forEach(key => {
            charts[key] = new Chart(ctx[key], {
                type: 'bar',
                data: {
                    labels: [''],
                    datasets: plans.map((plan, index) => ({
                        label: plan.name,
                        data: [initialStats[key][index]],
                        backgroundColor: plan.color
                    }))
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
    }

    function updateCharts() {
        Object.keys(charts).forEach(key => {
            charts[key].data.datasets = plans
                .filter(plan => selectedPlans.includes(plan.name))
                .map((plan, index) => ({
                    label: plan.name,
                    data: [initialStats[key][plans.findIndex(p => p.name === plan.name)]],
                    backgroundColor: plan.color
                }));
            charts[key].update();
        });
    }

    function setupEventListeners() {
        // Navegación del sidebar
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                document.querySelectorAll('.content-section').forEach(section => {
                    if (section.id === targetId) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });
            });
        });

        // Filtros de planes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const planName = e.target.id.replace('filter-', '');
                if (e.target.checked) {
                    selectedPlans.push(planName);
                } else {
                    selectedPlans = selectedPlans.filter(name => name !== planName);
                }
                updateCharts();
            });
        });

        // Tabs de estadísticas
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                document.getElementById(`${e.target.dataset.tab}-chart`).classList.add('active');
                currentTab = e.target.dataset.tab;
            });
        });

        // Formulario de cursos
        const courseForm = document.getElementById('courseForm');
        if (courseForm) {
            courseForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Curso registrado exitosamente!');
                courseForm.reset();
            });
        }

        // Formulario de videos
        const videoForm = document.getElementById('videoForm');
        if (videoForm) {
            videoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Video subido exitosamente!');
                videoForm.reset();
            });
        }

        // Botones de detalles de usuario
        document.querySelectorAll('.user-table .btn').forEach(button => {
            button.addEventListener('click', () => {
                alert('Detalles del usuario: Esta funcionalidad está en desarrollo.');
            });
        });

        // Messaging functionality
        const messageItems = document.querySelectorAll('.message-item');
        const messageView = document.querySelector('.message-view');
        const messageHeader = messageView.querySelector('.message-header h4');
        const messageBody = messageView.querySelector('.message-body');
        const replyTextarea = messageView.querySelector('textarea');
        const replyButton = messageView.querySelector('button');

        messageItems.forEach(item => {
            item.addEventListener('click', () => {
                const name = item.querySelector('h4').textContent;
                const message = item.querySelector('p').textContent;
                
                messageHeader.textContent = name;
                messageBody.innerHTML = `<p>${message}</p>`;
                item.classList.remove('unread');
            });
        });

        replyButton.addEventListener('click', () => {
            const reply = replyTextarea.value.trim();
            if (reply) {
                messageBody.innerHTML += `
                    <p><strong>You:</strong> ${reply}</p>
                `;
                replyTextarea.value = '';
            }
        });
    }

    initCharts();
    setupEventListeners();
});