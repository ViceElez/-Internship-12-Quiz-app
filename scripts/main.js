import { fetchQuizData } from './modules/api.js';
import { disableRadioButtons } from './modules/script.js';
import { createQuizList } from './modules/index.js';

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', fetchQuizData);
});
