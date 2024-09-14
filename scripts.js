document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('animationContainer');
    const nameContainer = document.getElementById('nameContainer');
    const sparklesContainer = document.getElementById('fullPageSparkles');
    const animateButton = document.getElementById('animateButton');
    const sparkleButton = document.getElementById('sparkleButton');
    const countdownElement = document.getElementById('countdown');
    const countdownCircleFg = document.querySelector('.countdown-circle-fg');
    const countdownCircleBg = document.querySelector('.countdown-circle-bg');
	const birthdayMusic = document.getElementById('birthdayMusic');
    const startBirthdayMusicButton = document.getElementById('startBirthdayMusic');
	const startMusicButton = document.getElementById('startBirthdayMusic');
    const introMusic = document.getElementById('introMusic');
	const nextPageButton = document.getElementById('nextPageButton');
   

	 // Show the button after 30 seconds
    setTimeout(() => {
        if (nextPageButton) {
            nextPageButton.classList.remove('hidden');
            console.log('Button is now visible.');
        }
    }, 40000);
	
	
    if (startBirthdayMusicButton) {
		startBirthdayMusicButton.addEventListener('click', () => {
			if (birthdayMusic) {
                birthdayMusic.play().catch(error => {
                    console.error("Error playing birthday music:", error);
                });
            } else {
                console.error("Birthday music element not found.");
            }
        });
    }
	
    if (!countdownElement) {
        console.error('Countdown element not found');
        return;
    }
    if (!countdownCircleFg) {
        console.error('Countdown circle foreground not found');
        return;
    }
    if (!countdownCircleBg) {
        console.error('Countdown circle background not found');
        return;
    }

    const name = localStorage.getItem('userName') || "❤NAVU❤";

    function createBalloons(message, targetContainer, animationSequence) {
        while (targetContainer.firstChild) {
            targetContainer.removeChild(targetContainer.firstChild);
        }

        const letters = message.split('');
        letters.forEach((letter, index) => {
            if (letter.trim() === '') {
                const gap = document.createElement('div');
                gap.style.width = '20px';
                gap.style.height = '1px';
                targetContainer.appendChild(gap);
            } else {
                const balloon = document.createElement('div');
                balloon.className = 'balloon';
                balloon.textContent = letter;
                balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
                targetContainer.appendChild(balloon);
                
                // Apply animations in sequence
                if (animationSequence === 'floatAround') {
                    balloon.style.animation = `floatAround 8s ease-in-out infinite`;
                } else if (animationSequence === 'dropAndFloat') {
                    balloon.style.animation = `dropAndFloat 2s ease-in-out forwards`;
                } else if (animationSequence === 'moveInCircle') {
                    balloon.style.animation = `moveInCircle 5s linear infinite`;
                } else if (animationSequence === 'arrangeText') {
                    balloon.style.animation = `arrangeText 2s ease-out forwards`;
                }
            }
        });
    }

    function startCountdown(duration) {
        let timeRemaining = duration;
        const totalDuration = duration;
        const circumference = 2 * Math.PI * 45;
        countdownCircleFg.style.strokeDasharray = circumference;
        countdownCircleFg.style.strokeDashoffset = circumference;

        countdownElement.textContent = timeRemaining;

        const interval = setInterval(() => {
            timeRemaining--;
            countdownElement.textContent = timeRemaining;
            const progress = timeRemaining / totalDuration;
            countdownCircleFg.style.strokeDashoffset = circumference * (1 - progress);

            if (timeRemaining < 0) {
                clearInterval(interval);
                countdownElement.style.display = 'none';
                countdownCircleFg.style.strokeDashoffset = 0;

                // Create balloons with different animations
                createBalloons("HAPPY BIRTHDAY", container, 'dropAndFloat');
                setTimeout(() => {
                    createBalloons("HAPPY BIRTHDAY", container, 'moveInCircle');
                }, 2000);
                setTimeout(() => {
                    createBalloons("HAPPY BIRTHDAY", container, 'arrangeText');
                }, 5000);
                setTimeout(() => {
                    createBalloons(name, nameContainer, 'dropAndFloat');
                }, 8000);
                setTimeout(() => {
                    createBalloons(name, nameContainer, 'moveInCircle');
                }, 10000);
                setTimeout(() => {
                    createBalloons(name, nameContainer, 'arrangeText');
                }, 15000);

                sparkle();
            }
        }, 1000);
    }

    startCountdown(10);

    function triggerButton(button, callback) {
        button.classList.add('hide');
        setTimeout(() => {
            button.classList.remove('show');
        }, 500);

        callback();
    }

    function animate() {
        // Apply balloon animations
        const balloons = document.querySelectorAll('#animationContainer .balloon');
        balloons.forEach(balloon => {
            balloon.style.animation = 'floatAround 8s ease-in-out infinite';
        });

        const balloonsUserName = document.querySelectorAll('#nameContainer .balloon');
        balloonsUserName.forEach(balloon => {
            balloon.style.animation = 'floatAround 8s ease-in-out infinite';
        });
    }

    function sparkle() {
        sparklesContainer.style.opacity = 1;

        setTimeout(() => {
            while (sparklesContainer.firstChild) {
                sparklesContainer.removeChild(sparklesContainer.firstChild);
            }

            for (let i = 0; i < 100; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.top = `${Math.random() * 100}%`;
                sparkle.style.left = `${Math.random() * 100}%`;
                sparkle.style.width = `${Math.random() * 20 + 10}px`;
                sparkle.style.height = sparkle.style.width;
                sparkle.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)`;
                sparkle.style.animation = `sparkleAnimation ${Math.random() * 2 + 1}s linear`;
                sparkle.style.opacity = Math.random();
                sparklesContainer.appendChild(sparkle);
            }

            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.background = `hsl(${Math.random() * 360}, 70%, 70%)`;
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = `${Math.random() * 100}%`;
                confetti.style.width = `${Math.random() * 10 + 5}px`;
                confetti.style.height = confetti.style.width;
                confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
                document.body.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }

            setTimeout(() => {
                sparklesContainer.style.opacity = 0;
            }, 3000);
        }, 0);
    }

    animateButton.addEventListener('click', () => triggerButton(animateButton, animate));
    sparkleButton.addEventListener('click', () => triggerButton(sparkleButton, sparkle));

    setInterval(() => {
        triggerButton(animateButton, animate);
        setTimeout(() => triggerButton(sparkleButton, sparkle), 2500);
    }, 5000);

    function login() {
        localStorage.setItem('userName', 'YourUserName');
        triggerButton(sparkleButton, sparkle);
    }

    document.getElementById('loginForm')?.addEventListener('submit', (event) => {
        event.preventDefault();
        login();
        // Redirect to birthday.html after login
        window.location.href = 'birthday.html';
    });

    document.addEventListener('mousemove', (e) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.top = `${e.clientY}px`;
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.width = '15px';
        sparkle.style.height = '15px';
        sparkle.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)`;
        sparkle.style.animation = 'sparkleAnimation 1s linear';
        sparkle.style.opacity = 0.7;
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    });
});
