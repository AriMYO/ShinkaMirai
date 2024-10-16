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
});