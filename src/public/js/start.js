
const header = document.querySelector("header");
const kanjiData = header.querySelector("h1");
const form = document.querySelector("form");
const romaji = form.querySelector("div:first-child input");
const english = form.querySelector("div:nth-child(2) input");
const submit = form.querySelector("div:nth-child(3) input");
const back = form.querySelector("span a");


const home = `http://${window.location.host}/`;

back.href = home 


function counter(n){
    
    let value = Math.floor(Math.random() * (n + 1))
    
    return value
}

function randomNum(){
    let n = Math.floor(Math.rand)

}


function submitHandler(event){
    
    submit.value = "something";


}










submit.addEventListener("click",submitHandler)