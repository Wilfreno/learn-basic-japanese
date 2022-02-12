const socket = io();
const kanji = document.querySelector("h1");
const form = document.querySelector("form");
const romaji = form.querySelector("input:first-child");
const english = form.querySelector("div:nth-child(2) input");
const submit = form.querySelector("button");


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
            const next = document.createElement("button");
            next.innerText = "Next";

            div.appendChild(next);
        }
    );
        console.log(english_value);
    
});

socket.on("roErr", (msg) => {
    romaji.remove();
    const div = form.querySelector("div:first-child");
    const h3 = document.createElement("h3");
    h3.innerHTML = `${msg}`;

    div.appendChild(h3);

});

socket.on("eError",(msg) => {
    english.remove();
    const div = form.querySelector("div:nth-child(2)")
    const h3 = document.createElement("h3");
    h3.innerHTML = `${msg}`;

    div.appendChild(h3);
    
});

socket.on("correct",(rom, eng ) =>{
    english.remove();
    romaji.remove();

    const div1 = form.querySelector("div:first-child");
    const div2 = form.querySelector("div:nth-child(2)");
    const h3 = document.createElement("h3");
    
    div1.appendChild(h3.innerHTML = `${rom}`);
    div2.appendChild(h3.innerHTML = `${eng}`);

})