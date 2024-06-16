document.addEventListener('DOMContentLoaded', function() {
    let timeLeft = 30 * 60; // 30 minutes in seconds
    const countdownElement = document.getElementById('countdownTimer');

    const timerId = setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        // Update the display
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            // You can add any action here to be executed after the countdown ends
            alert('Time is up! Please submit your reservation.');
            // Optionally disable form submission or take other actions
        } else {
            timeLeft--;
        }
    }, 1000); // Update every second
});
