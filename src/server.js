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


app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, 'public')));
 


app.get("/", async (req, res) => {
    res.render("home");
});

app.get("/*", (req, res) => {
    res.redirect("/")
});


ioServer.on("connection", (socket) => {

    const value = Math.floor(Math.random() * kanji.length + 1);
    const data = kanji[value];
    const data_kanji = data.japanese;
    
    socket.emit("play", data_kanji)

    socket.on("submit", (rom, eng, play) =>{

        if(rom != data.romaji){

            socket.emit("roErr", data.romaji);
            play();
        }
        if(eng != data.english){
            socket.emit("eError", data.english);
            play();
        }else{
            socket.emit("correct" , data.romaji, data.english);
            play();
        }
        
        
    });

});
httpServer.listen(port,() => console.log("running..."));