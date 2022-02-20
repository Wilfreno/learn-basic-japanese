
const header = document.querySelector("header");
const h1 = header.querySelector("h1");
const main = document.querySelector("main");
const p = main.querySelector("p");
const start = main.querySelector("button");

const startRoute = `http://${window.location.host}/play`;






function startHandler(event){
    event.preventDefault();
    
    window.location.href = startRoute;
    
}







start.addEventListener("click", startHandler);
