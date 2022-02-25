import express from "express";
import path from "path/posix";
import bodyParser from "body-parser";
import kanji from "./public/model/kanji"


const app = express();
const port = 3000 || "https://wilfreno.github.io/learn-basic-japanese";


app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {

    res.render("play")

})    

app.get("/*", (req, res) => {
    res.redirect("/")
});


app.listen(port,() => {
    console.log("running...")
});