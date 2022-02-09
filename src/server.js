import {createServer} from "http";
import {Server} from "socket.io"
import express from "express";
import mongoose from "mongoose";
import path from "path/posix";
import {} from "dotenv/config";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;
const httpServer = createServer(app);
const ioServer = new Server(httpServer);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DB_CONNECTION,() => console.log("connected to DB.."))


app.get("/", async (req, res) => {
    res.render("home")
    
});

app.get("/*", (req, res) => {
    res.redirect("/")
});


httpServer.listen(port, () => console.log("running server.."));