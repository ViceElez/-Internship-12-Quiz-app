import {disableRadioButtons,selectedCategory, selectedDiff, selectedType} from "./script.js";

let fetchQuizData =()=>{
    if(selectedCategory === null || selectedDiff === null || selectedType === null){
        alert("Morate odabrati sve opcije kako bi ste mogli dobiti pitanja!");
        return;
    }
    disableRadioButtons();
    let category = fetchCategory();
    let difficulty = fetchDifficulty();
    let type = fetchType();
    let url = `https://opentdb.com/api.php?amount=5${category}${difficulty}${type}`;
    fetch(url).then(response => response.json()).then(data =>(console.log(data)));
    
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
        return null;
    }
 }
 let fetchDifficulty = () => {
    if(selectedDiff==='easy')
    {
        return '&difficulty=easy';
    }
    else if(selectedDiff==='medium')
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
    else if(selectedType==='boolean')
    {
        return '&type=boolean';
    }
 }
 document.getElementById('start').addEventListener('click',fetchQuizData);

 export {fetchQuizData};