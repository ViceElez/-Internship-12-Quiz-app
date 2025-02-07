
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

export {createQuizList, createCorrect, createInCorrect};