import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
app.set("port", 3000);
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res)=>res.render("home"))
// app.get("/", (req, res)=>{
//     req.app.render("home", {}, (err, html)=>{
//         if(err) throw err;
//         res.end(html);
//     })
// });
app.get("/*", (req, res)=> res.redirect("/"));


const server = http.createServer(app);
server.listen(app.get("port"), ()=> {
    console.log(`listening on http://localhost:${app.get("port")}`);
});

const wsServer = SocketIO(server);

wsServer.on("connection", (socket)=>{
    console.log("클라이언트 연결 됨 >> ", socket);
});