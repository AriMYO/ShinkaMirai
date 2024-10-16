document.addEventListener('DOMContentLoaded', function() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const timeDisplay = document.getElementById('timeDisplay');
    let isPlaying = false;
    let currentTime = 3;
    const totalDuration = 168; // 2:48 in seconds

    playPauseBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
        if (isPlaying) {
            startTimer();
        } else {
            stopTimer();
        }
    });

    function startTimer() {
        timer = setInterval(function() {
            currentTime++;
            if (currentTime >= totalDuration) {
                stopTimer();
                isPlaying = false;
                playPauseBtn.textContent = '▶';
            }
            updateTimeDisplay();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function updateTimeDisplay() {
        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(totalDuration)}`;
        const progress = (currentTime / totalDuration) * 100;
        document.querySelector('.video-progress .progress').style.width = `${progress}%`;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    updateTimeDisplay();

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle comment form submission
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('commentInput');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const commentText = commentInput.value.trim();
        if (commentText) {
            addComment(commentText);
            commentInput.value = ''; // Clear the input
        }
    });

    function addComment(text) {
        const commentSection = document.querySelector('.comments-section');
        const newComment = document.createElement('div');
        newComment.classList.add('comment-card');
        newComment.innerHTML = `
            <div class="comment-content">
                <div class="comment-header">
                    <h4>Nuevo Usuario</h4>
                    <span class="comment-meta">Ahora mismo</span>
                </div>
                <p>${text}</p>
                <div class="comment-actions">
                    <button class="btn-text">💬 Responder</button>
                    <button class="btn-text">👍 0</button>
                </div>
            </div>
        `;
        commentSection.insertBefore(newComment, commentForm);
    }
});
