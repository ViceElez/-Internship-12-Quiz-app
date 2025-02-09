import {fetchQuizData} from "./api.js";
let timeoutId=null;
function createQuizList(question){
    const h5=document.createElement("h5");
    h5.textContent=question;
    return h5;
}

function createCorrect(correctA){
    const button=document.createElement("button");
    button.textContent=correctA;
    return button;
}

function createInCorrect(incorrectA){
    const bt1=document.createElement("button");
    bt1.textContent=incorrectA;
    return bt1;
}

function shuffleButtons(buttons) {
    for (let i = buttons.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
    }
}

function createQuizLayout(data,selectedType){
    let currentQuestion=0;
    let correctAnswers=0;
    showQuestion(selectedType,currentQuestion,correctAnswers,data);
    return;
}

function showQuestion(selectedType,currentQuestion,correctAnswers,data){
    const quizDiv=document.createElement("div");
    quizDiv.id="quizDiv";

    quizDiv.style.display="flex";
    quizDiv.style.flexDirection="column";
    quizDiv.style.alignItems="center";  
    quizDiv.style.justifyContent="center";
    quizDiv.style.gap="10px";
    quizDiv.style.backgroundColor="lightblue";
    quizDiv.style.width="50%";
    quizDiv.style.margin="auto";
    quizDiv.style.marginTop="100px";
    quizDiv.style.padding="30px";
    quizDiv.style.borderRadius="30px";

    if(currentQuestion>=data.results.length){
        quizDiv.innerHTML=`<h2>Kviz je zavrsen</h2>
        <h3>Broj tocnih odgovora je ${correctAnswers}</h3>`;

        let returnButton=document.createElement("button");
        returnButton.textContent="Povratak";
        returnButton.style.width="100px";
        returnButton.style.padding="10px";
        returnButton.style.borderRadius="30px";
        returnButton.style.backgroundColor="lightgreen";
        returnButton.style.marginTop="20px";

        returnButton.addEventListener("click",fetchQuizData);
        quizDiv.appendChild(returnButton);
        document.body.appendChild(quizDiv);
        //prbolem s metodom je da me nevrati na pocetak nego mi samo fetcha opet pitanja
        return;
    }
    

    const question=data.results[currentQuestion];

    const questionDiv=document.createElement("div");
    const h=createQuizList(question.question);
    h.style.textAlign="center";
    questionDiv.appendChild(h);

    const answersDiv=document.createElement("div");
    answersDiv.style.display = "flex";
    answersDiv.style.justifyContent = "center";
    answersDiv.style.flexWrap = "wrap"; 
    answersDiv.style.gap = "10px";
    answersDiv.style.width = "300px";

    let button = [];

    if(selectedType==="tf"){
        let corrBtn=createCorrect('True');
        let incorrBtn=createInCorrect('False');
        button.push(corrBtn);
        button.push(incorrBtn);
    }

    else{ 
        let corrBtn=createCorrect(question.correct_answer);
        let incorrBtn=createInCorrect(question.incorrect_answers[0]);
        let incorrBtn1=createInCorrect(question.incorrect_answers[1]);
        let incorrBtn2=createInCorrect(question.incorrect_answers[2]);
        button.push(corrBtn);
        button.push(incorrBtn);
        button.push(incorrBtn1);
        button.push(incorrBtn2);
        shuffleButtons(button);
    }

    button.forEach(button => {
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
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    confirmAnswer(button, question, correctAnswers, currentQuestion, selectedType, data);
                }, 2000);
            });     
            answersDiv.appendChild(button);
    });
    

    quizDiv.appendChild(questionDiv);
    quizDiv.appendChild(answersDiv);
    document.body.appendChild(quizDiv);
} 

function confirmAnswer(button,question,correctAnswers,currentQuestion,selectedType,data){
    let userConfirmed=confirm("Da li ste sigurni u odgovor?");
    if(userConfirmed){
        if(button.textContent===question.correct_answer){
            correctAnswers++;
            currentQuestion++;
            button.style.backgroundColor="green";
        }
        else{
            currentQuestion++;
            button.style.backgroundColor="red";
        }
        setTimeout(() => {
            document.getElementById("quizDiv").remove();
             showQuestion(selectedType, currentQuestion, correctAnswers, data);
          }, "1000");
    }
    else{
        return;
    }

}


export {createQuizLayout};