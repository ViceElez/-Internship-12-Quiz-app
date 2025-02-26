import { enableRadioButtons } from "./script.js";
let timeoutId = null;
let pastResults = [];

function createQuizList(question) {
    const h5 = document.createElement("h5");
    h5.textContent = question;
    return h5;
}

function createCorrect(correctA) {
    const button = document.createElement("button");
    button.textContent = correctA;
    return button;
}

function createInCorrect(incorrectA) {
    const bt1 = document.createElement("button");
    bt1.textContent = incorrectA;
    return bt1;
}

function shuffleButtons(buttons) {
    for (let i = buttons.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
    }
}

function createQuizLayout(data, selectedType) {
    let currentQuestion = 0;
    let correctAnswers = 0;
    showQuestion(selectedType, currentQuestion, correctAnswers, data);
    return;
}

function showQuestion(selectedType, currentQuestion, correctAnswers, data) {
    let quizDiv = document.getElementById("quizDiv");
    quizDiv.style.backgroundColor = "lightblue";

    if (currentQuestion >= data.results.length) {
        quizDiv.innerHTML = `<h2>Kviz je zavrsen</h2>
        <h3>Broj tocnih odgovora je ${correctAnswers}</h3>`;

        let returnButton = document.createElement("button");
        returnButton.textContent = "Povratak";
        returnButton.style.width = "100px";
        returnButton.style.padding = "10px";
        returnButton.style.borderRadius = "30px";
        returnButton.style.backgroundColor = "lightgreen";
        returnButton.style.marginTop = "20px";

        quizDiv.appendChild(returnButton);
        document.body.appendChild(quizDiv);
        returnButton.addEventListener("click", () => {
            endQuiz(correctAnswers, data.results[0].difficulty, selectedType);
        });
        return;
    }

    const question = data.results[currentQuestion];

    quizDiv.innerHTML = `<div id="timer" style="text-align: center; font-size: 20px; margin-bottom: 20px;"></div>`;

    const questionDiv = document.createElement("div");
    const h = createQuizList(question.question);
    h.style.textAlign = "center";
    questionDiv.appendChild(h);

    const answersDiv = document.createElement("div");
    answersDiv.style.display = "flex";
    answersDiv.style.justifyContent = "center";
    answersDiv.style.flexWrap = "wrap";
    answersDiv.style.gap = "10px";
    answersDiv.style.width = "300px";

    let buttons = [];

    if (selectedType === "tf") {
        let corrBtn = createCorrect('True');
        let incorrBtn = createInCorrect('False');
        buttons.push(corrBtn);
        buttons.push(incorrBtn);
    } else {
        let corrBtn = createCorrect(question.correct_answer);
        let incorrBtn = createInCorrect(question.incorrect_answers[0]);
        let incorrBtn1 = createInCorrect(question.incorrect_answers[1]);
        let incorrBtn2 = createInCorrect(question.incorrect_answers[2]);
        buttons.push(corrBtn);
        buttons.push(incorrBtn);
        buttons.push(incorrBtn1);
        buttons.push(incorrBtn2);
        shuffleButtons(buttons);
    }

    let timerId = startTimer(20, question, correctAnswers, currentQuestion, selectedType, data, buttons);

    buttons.forEach(button => {
        button.style.width = "140px";
        button.style.textAlign = "center";
        button.style.padding = "20px";
        button.style.gap = "50px";
        button.style.borderRadius = "30px";
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = 'lightblue';
            button.style.cursor = 'pointer';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '';
        });

        button.addEventListener("click", () => {
            clearInterval(timerId); 
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                confirmAnswer(button, question, correctAnswers, currentQuestion, selectedType, data, buttons);
            }, 2000);
        });
        answersDiv.appendChild(button);
    });

    quizDiv.appendChild(questionDiv);
    quizDiv.appendChild(answersDiv);
    document.body.appendChild(quizDiv);
}

function startTimer(duration, question, correctAnswers, currentQuestion, selectedType, data, buttons) {
    let timerDisplay = document.getElementById("timer");
    timerDisplay.style.fontWeight = "bold";
    timerDisplay.style.fontSize = "20px";
    let timeLeft = duration;

    let timerId = setInterval(() => {
        timerDisplay.textContent = `Preostalo vremena: ${timeLeft} sekundi`;
        timeLeft--;

        
        if (timeLeft < 0) {
            clearInterval(timerId);
            handleTimeout(question, correctAnswers, currentQuestion, selectedType, data, buttons);
        }
    }, 1000);

    return timerId;
}

function handleTimeout(question, correctAnswers, currentQuestion, selectedType, data, buttons) {
    buttons.forEach(button => {
        if (button.textContent === question.correct_answer) {
            button.style.backgroundColor = "green";
        } 
    });

    setTimeout(() => {
        document.getElementById("quizDiv").innerHTML = "";
        showQuestion(selectedType, currentQuestion + 1, correctAnswers, data);
    }, 1000);
}

function confirmAnswer(button, question, correctAnswers, currentQuestion, selectedType, data, buttons) {
    let userConfirmed = confirm("Da li ste sigurni u odgovor?");
    if (userConfirmed) {
        if (button.textContent === question.correct_answer) {
            correctAnswers++;
            currentQuestion++;
            button.style.backgroundColor = "green";
        } else {
            currentQuestion++;
            button.style.backgroundColor = "red";
            buttons.forEach(item => {
                if (item.textContent === question.correct_answer) {
                    item.style.backgroundColor = "green";
                }
            });
        }
        setTimeout(() => {
            document.getElementById("quizDiv").innerHTML = "";
            showQuestion(selectedType, currentQuestion, correctAnswers, data);
        }, "1000");
    } else {
        return;
    }
}

function endQuiz(points, diff, type) {
    let difficulty;
    let quizType;
    if (diff === "easy") {
        difficulty = 'Lagano'
    } else if (diff === "mid") {
        difficulty = 'Srednje'
    } else if (diff === "hard") {
        difficulty = 'Tesko'
    }

    if (type === "tf") {
        quizType = 'True/False'
    } else if (type === "multiple") {
        quizType = 'Multiple Choice'
    }

    pastResults.push({
        points: points,
        difficulty: difficulty,
        quizType: quizType,
        time: new Date().toLocaleTimeString()
    })

    updateResult();
    resetQuiz();
    return;
}

function updateResult() {
    let resultDiv = document.getElementById("resultDiv");
    resultDiv.innerHTML = "";
    let title = document.createElement("h3");
    title.textContent = "Rezultati kvizova:";
    resultDiv.appendChild(title);
    resultDiv.appendChild(document.createElement("br"));

    pastResults.forEach((result, index) => {
        let resultTxt = document.createElement("p");
        resultTxt.textContent = ` Kviz ${index + 1}.: Bodovi: ${result.points}, Tezina:${result.difficulty}, Kategorija: ${result.quizType}, Vrijeme izvrsavanja kviza: ${result.time}`;
        resultDiv.appendChild(resultTxt);

        resultDiv.appendChild(document.createElement("br"));
    });
}

function resetQuiz() {
    document.getElementById("quizDiv").innerHTML = "";
    document.getElementById("quizDiv").style.backgroundColor = "white";
    document.getElementsByClassName('start')[0].style.display = "flex";

    enableRadioButtons();
    return;
}

export { createQuizLayout };