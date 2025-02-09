let radioBtnCategory = document.getElementsByName('radAnswer');
let radioBtnDiff = document.getElementsByName('radAnswer1');
let radioBtnType = document.getElementsByName('radAnswer2');

let selectedCategory = null;
let selectedDiff = null;
let selectedType = null;

let findSelcetedRadioBtnCategory = () => {
    let selected=document.querySelector('input[name="radAnswer"]:checked');
    selectedCategory = selected ? selected.id : null;
    if(selectedCategory !== null){
        textCat.textContent=`Odabrana kategorija pitanja: ${selected.value}`;
    }
}

let findSelcetedRadioBtnDiff = () => {
    let selected=document.querySelector('input[name="radAnswer1"]:checked'); 
    selectedDiff = selected ? selected.id : null;
    if(selectedDiff !== null){
        textDiff.textContent=`Odabrana tezina pitanja: ${selected.value}`;
    }
}

let findSelcetedRadioBtnType = () => {
    let selected=document.querySelector('input[name="radAnswer2"]:checked');
    selectedType = selected ? selected.id : null;
    if(selectedType !== null){
        textType.textContent=`Odabrana vrsta pitanja: ${selected.value}`;
    }
}

radioBtnCategory.forEach(radCategory => {
    radCategory.addEventListener("change",findSelcetedRadioBtnCategory);
});
radioBtnDiff.forEach(radDiff => {
    radDiff.addEventListener("change",findSelcetedRadioBtnDiff);
});
radioBtnType.forEach(radType => {
    radType.addEventListener("change",findSelcetedRadioBtnType);
});

function disableRadioButtons() {
    radioBtnCategory.forEach(radio => radio.disabled = true);
    radioBtnDiff.forEach(radio => radio.disabled = true);
    radioBtnType.forEach(radio => radio.disabled = true);
}

function enableRadioButtons() {
    radioBtnCategory.forEach(radio => radio.disabled = false);
    radioBtnDiff.forEach(radio => radio.disabled = false);
    radioBtnType.forEach(radio => radio.disabled = false);
}

export {disableRadioButtons,enableRadioButtons,selectedCategory, selectedDiff, selectedType};
