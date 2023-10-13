const translationButton = document.getElementById('translateButton');
const languageOptions = document.querySelectorAll('.language-option');

let selectedLanguage = localStorage.getItem('selectedLanguage') || 'en-US';
updateLanguage();

translationButton.addEventListener('click', () => {
    const languageDropdown = document.querySelector('.language-options');
    languageDropdown.classList.toggle('show');
});

languageOptions.forEach(option => {
    option.addEventListener('click', () => {
        selectedLanguage = option.getAttribute('data-lang');
        updateLanguage();
        localStorage.setItem('selectedLanguage', selectedLanguage);

        const languageDropdown = document.querySelector('.language-options');
        languageDropdown.classList.remove('show');
    });
});

function updateLanguage() {
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

    document.getElementById('clock').textContent = getClockText(selectedLanguage);
    document.getElementById('date').textContent = new Date().toLocaleDateString(selectedLanguage, dateOptions);

    // Update any additional text on your page based on the selected language
}

function getClockText(lang) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? (lang === 'ko-KR' ? '오후' : 'PM') : (lang === 'ko-KR' ? '오전' : 'AM');
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
}

updateLanguage();
setInterval(updateLanguage, 1000);


const musicButton = document.getElementById('musicButton');
let isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
const audioElement = new Audio('assets/music-lobby.mp3'); // Replace with the correct path

audioElement.loop = true; // Set the audio to loop continuously

updateMusicIcon();
updateMusicState();

musicButton.addEventListener('click', () => {
    isMusicPlaying = !isMusicPlaying;
    updateMusicIcon();
    updateMusicState();
    toggleMusic();
});

function updateMusicIcon() {
    const iconClass = isMusicPlaying ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    musicButton.innerHTML = `<i class="${iconClass}"></i>`;
}

function updateMusicState() {
    localStorage.setItem('musicPlaying', isMusicPlaying);
}

function toggleMusic() {
    if (isMusicPlaying) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
}

if (isMusicPlaying) {
    audioElement.play();
}

