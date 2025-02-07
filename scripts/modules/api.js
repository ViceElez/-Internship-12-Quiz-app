import {disableRadioButtons,selectedCategory, selectedDiff, selectedType} from "./script.js";
import{createCorrect, createInCorrect, createQuizList} from "./index.js";

async function fetchQuizData(){
    if(selectedCategory === null || selectedDiff === null || selectedType === null){
        alert("Morate odabrati sve opcije kako bi ste mogli dobiti pitanja!");
        return;
    }
    disableRadioButtons();
    let category = fetchCategory();
    let difficulty = fetchDifficulty();
    let type = fetchType();
    try{

        const res=await fetch(`https://opentdb.com/api.php?amount=5${category}${difficulty}${type}`);
        if(!res.ok){
            throw new Error('HTTP error');
        }

        const data=await res.json();
        console.log(data);

        data.results.forEach(question => {
            const div=document.createElement("div");

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

            const correct=createCorrect(question.correct_answer);
            const incorrect=createInCorrect(question.incorrect_answers[0]);
            const incorrect1=createInCorrect(question.incorrect_answers[1]);
            const incorrect2=createInCorrect(question.incorrect_answers[2]);

            [correct, incorrect, incorrect1, incorrect2].forEach(button => {
                button.style.width = "140px"; 
                button.style.textAlign = "center";
                button.style.padding = "10px"; 
            });

            answersDiv.appendChild(correct);
            answersDiv.appendChild(incorrect);
            answersDiv.appendChild(incorrect1);
            answersDiv.appendChild(incorrect2);

            div.style.display = "flex";
            div.style.flexDirection = "column";
            div.style.alignItems = "center";
            div.style.gap = "20px"; 

            div.appendChild(questionDiv);
            div.appendChild(answersDiv);
            document.body.appendChild(div);

        });


    }catch(error){
        console.log(error);
        return;
    }  
 }

 let fetchCategory = () => {

    if(selectedCategory==='animal')
    {
        return '&category=27';
    }
    else if(selectedCategory==='celeb')
    {
        return '&category=26';
    }
    else if(selectedCategory==='art')
    {
        return '&category=25';
    }
    else if(selectedCategory==='pol')
    {
        return '&category=24';
    }
    else if(selectedCategory==='his')
    {
        return '&category=23';
    }
    else if(selectedCategory==='geo')
    {
        return '&category=22';
    }
    else if(selectedCategory==='sport')
    {
        return '&category=21';
    }
    else if(selectedCategory==='mit')
    {
        return '&category=20';
    }
    else if(selectedCategory==='nth')
    {
        return '';
    }
 }
 let fetchDifficulty = () => {
    if(selectedDiff==='easy')
    {
        return '&difficulty=easy';
    }
    else if(selectedDiff==='mid')
    {
        return '&difficulty=medium';
    }
    else if(selectedDiff==='hard')
    {
        return '&difficulty=hard';
    }
 }
 let fetchType = () => {
    if(selectedType==='multiple')
    {
        return '&type=multiple';
    }
    else if(selectedType==='tf')
    {
        return '&type=boolean';
    }
 }
 document.getElementById('start').addEventListener('click',fetchQuizData);



 export {fetchQuizData};