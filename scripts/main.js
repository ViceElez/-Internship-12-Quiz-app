import { fetchQuizData } from './modules/api.js';

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', fetchQuizData);
});
