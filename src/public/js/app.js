const socket = io();
const kanji = document.querySelector("h1");
const form = document.querySelector("form");
const romaji = form.querySelector("div:first-child input");
const english = form.querySelector("div:nth-child(2) input");
const submit = form.querySelector("button");


romaji.setAttribute("required","");
english.setAttribute("required","");
socket.on("play", (msg) => {
    
    kanji.innerHTML = `${msg}`;
})

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const romaji_value = romaji.value;
    const english_value = english.value;

    socket.emit("submit", 
        romaji_value, 
        english_value,
        () => {
            submit.remove();

            const div = form.querySelector("div:nth-child(3)");
            next = document.createElement("button");
            next.innerText = "Next";

            div.appendChild(next);
        }
    );
});


socket.on("roErr", (msg) => {
    romaji.remove();
    const div = form.querySelector("div:first-child");
    const h3 = document.createElement("h3");
    
    h3.innerHTML = `${msg}❌`;
    
    div.appendChild(h3);
    
});

socket.on("rCorrect", (msg) => {
    
    romaji.remove();
    const div1 = form.querySelector("div:first-child");
    const h3 = document.createElement("h3");    
    h3.innerHTML = `${msg}✔`;

    div1.appendChild(h3);
});

socket.on("eError", (msg) => {
    english.remove();
    const div = form.querySelector("div:nth-child(2)")
    const h3 = document.createElement("h3");
    h3.innerHTML = `${msg}❌`;

    div.appendChild(h3);
    
});

socket.on("eCorrect", (msg) =>{
    
    english.remove();
    const div = form.querySelector("div:nth-child(2)");
    const h3 = document.createElement("h3");

    h3.innerHTML = `${msg}✔`;
    div.appendChild(h3);
    console.log("correct");
})