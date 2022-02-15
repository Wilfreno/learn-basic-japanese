const socket = io();
const kanji = document.querySelector("h1");
const form = document.querySelector("form");
const romaji = form.querySelector("div:first-child input");
const rData = form.querySelector("div:first-child h3");
const english = form.querySelector("div:nth-child(2) input");
const eData = form.querySelector("div:nth-child(2) h3")
const submit = form.querySelector("div:nth-child(3) input");
const next = form.querySelector("div:nth-child(3) button");
let romaji_value;
let eng_value


// modifying/hidind the elements
next.innerHTML = "&#10095";
next.style.display = "none";


//socket.io eventslisteners
socket.on("play", (msg) => {
    
    kanji.innerHTML = `${msg}`;
})

socket.on("romErr", (msg) =>{
    const h3 = document.createElement("h3");
    
    h3.innerHTML = `${msg}❌`;
    romaji.parentNode.replaceChild(h3, romaji);

});

socket.on("rCorrect", (msg) =>{
    const h3 = document.createElement("h3");

    h3.innerHTML = `${msg}✔`;
    romaji.parentNode.replaceChild(h3, romaji);
});

socket.on("eCorrect", (msg) =>{
    const h3 = document.createElement("h3");

    h3.innerHTML = `${msg}✔`;
    english.parentNode.replaceChild(h3, english);

});

socket.on("eError", (msg) => {
    const h3 = document.createElement("h3");

    h3.innerHTML = `${msg}❌`;
    english.parentNode.replaceChild(h3, english);

});


// event Handlers
function submitHandler(event){
    
    event.preventDefault();
    romaji_value = romaji.value;
    eng_value = english.value;

    socket.emit("submit", 
                romaji_value,
                eng_value,
                () => {
                    submit.style.display = "none";
                    next.style.display =  "block"
                }

    );

    romaji_value = "";
    eng_value = "";

};

function enterHandler(event){
    if (event.keycode === 13){
        form.submit();
    }
    
}

function nextHandler(event){
    event.preventDefault();
    next.style.color = "red";
    console.log("next...")
};



// event listeners
form.addEventListener("submit", submitHandler);
form.addEventListener("keyup", enterHandler);
next.addEventListener("click", nextHandler);