//content

const k = document.getElementById("kanji__content");
const romajiInput = document.getElementById("romaji__input");
const englishInput = document.getElementById("english__input");
const submitbtn = document.querySelector("#submit");
const form = document.querySelector("form")


// modal

const modal = document.querySelector(".modal");
const kresult = document.querySelector(".result h1")
const rom = document.getElementById("romaji__result")
const eng = document.getElementById("english__result");
const next = document.getElementById("next");

//data
let kanjiData;
let len;
let randomValue;
let randomData;


// Modal

modal.style.display = "none";


// Getting Data from JSON file
function getData(){
    
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(){
    
        if(xhttp.readyState === 4 && xhttp.status === 200){
    
            kanjiData = JSON.parse(xhttp.response)
            len = kanjiData.kanji.length
            randomValue = Math.floor(Math.random() * (len + 1))
            randomData = kanjiData.kanji[randomValue]
        
            k.innerHTML = randomData.japanese;
            
        }
    
    };
    
    xhttp.open("GET", "./model/kanji.json", true);
    xhttp.send();
      
}

getData();


// Event Handlers

function submitHandler(event){

    event.preventDefault();
    let rValue = romajiInput.value;
    let evalue = englishInput.value;
    
    if(rValue  === ""  && evalue === ""){
        
        alert("please put something")
        
    }
    else{
    
        modal.style.display = "block";
        
        rom.innerText = randomData.romaji;
        eng.innerText = randomData.english;
        kresult.innerText = randomData.japanese;
        
        form.reset()
    }
    
}

function nextDataHandler(event){
 
    event.preventDefault();
    
    modal.style.display = "none";
    
    getData();

}




// Event Listeners
next.addEventListener("click", nextDataHandler);
form.addEventListener("submit", submitHandler);
