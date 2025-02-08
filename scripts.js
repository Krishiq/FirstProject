const messages = [
    "Are you sure Dolly?",
    "Really sure??",
    "Are you positive?",
    "Dolly my Pookie please...",
    "Just think about it Dolly!",
    "If you say no, I will be really sad...",
    "I will be very sad Dolly...",
    "I will be very very very sad Dolly...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}
