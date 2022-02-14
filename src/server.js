import {createServer} from "http";
import {Server} from "socket.io"
import express from "express";
import path from "path/posix";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import kanji from "./models/kanji.js";

const app = express();
const port = 3000;
const httpServer = createServer(app);
const ioServer = new Server(httpServer);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let data;
let data_kanji;


app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, 'public')));
 


app.get("/", async (req, res) => {
    res.render("home");
});

app.get("/*", (req, res) => {
    res.redirect("/")
});

const start = () => {

    data = kanji[Math.floor(Math.random() * kanji.length + 1)];
    data_kanji = data.japanese;
}

ioServer.on("connection", (socket) => {
    
    start();
    socket.emit("play", data_kanji)

    socket.on("submit", (rom, eng, play) =>{

        if(rom = !data.romaji){

            socket.emit("roErr", data.romaji);
        }
        if(rom = data.romaji){
            socket.emit("rCorrect", data. romaji);
        }
        if(data.english.includes(eng)){
                socket.emit("eCorrect", data.english);           
        }
        if(!data.english.includes(eng)){
            socket.emit("eError", data.english);
        }
        
        play();
    });
    
    console.log(data.romaji);
    console.log(data.english);
    socket.on("next", () =>{
        start();
    });

});
httpServer.listen(port,() => console.log("running..."));