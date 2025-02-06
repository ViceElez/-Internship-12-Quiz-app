
function createQuizList(quizDatas){
    console.log("Hello from index.js");
    console.log(quizDatas);

    const ul=document.createElement("ul");

    quizDatas.forEach(quizData => {
        console.log(quizData.question);
        const li=document.createElement("li");
        li.textContent=quizData.question;
        ul.appendChild(li);
    });

    return ul;
}

export {createQuizList};