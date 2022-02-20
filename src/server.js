import express, { request } from "express";
import path from "path/posix";
import bodyParser from "body-parser"
import kanji from "./public/models/kanji.js";



const app = express();
const port = 3000;
let kanjiObject = kanji[randomValue()]


app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get("/", (req, res) => {
    res.render("home")
});

app.get("/play", (req, res) => {
   
    let romajiResult
    let englishResult
    let romData = req.query.romanjiData
    let engData = req.query.englishData

    if(romData != kanjiObject.romaji){
        
        romajiResult = `${romData}❌`

    }
    if(romData === kanjiObject.romaji){
        
        romajiResult = `${romData}✔`

    }
    if(engData != kanjiObject.english){
        
        englishResult = `${engData}❌`

    }
    if(engData === kanjiObject.english){
        
        englishResult = `${engData}✔`

    }


    res.render("start",{
        kanjiValue : kanjiObject.japanese, 
        romaji : kanjiObject.romaji,
        english : kanjiObject.english,
        romajiR : romajiResult,
        englishR : englishResult
    })

})    


app.get("/*", (req, res) => {
    res.redirect("/play")
});

function randomValue(){

    return Math.floor(Math.random() * (kanji.length + 1))

}


app.listen(port,() => {
    console.log("running...", kanjiObject)
});