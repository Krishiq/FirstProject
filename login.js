document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
	const introMusic = document.getElementById('introMusic');
    const startMusicButton = document.getElementById('startMusic');

     if (startMusicButton) {
        startMusicButton.addEventListener('click', () => {
            if (introMusic) {
                introMusic.play().catch(error => {
                    console.error("Error playing intro music:", error);
                });
            } else {
                console.error("Intro music element not found.");
            }
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        if (password === 'nsaini1752') {
            localStorage.setItem('userName', name);
            window.location.href = 'mainpage.html'; // Ensure this path is correct
        } else {
            errorMessage.classList.remove('hidden');
        }
    });
});
