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
    console.log("클라이언트 연결 됨 >> ");

    // socket.on('enter_room', (msg, a, b, callback)=>{
    //     console.log("msg ----> ", msg);
    //     socket.emit('echo', "셤은 담주에 본다");
    //     console.log(a, b, callback);
    //     callback("이것은 서버에서 보내 준 메세지입니다.");
    // });

    // 채팅 룸 만들기
    socket.on('enter_room', (roomName, callback)=>{
        callback(roomName);
        // console.log(roomName);
        // console.log(socket.id);
        // console.log(socket.rooms);
        socket.join(roomName);
        // console.log(socket.rooms);
        // message sender를 제외한 같은 room의 소켓에 일제히 보낸다.
        socket.to(roomName).emit('welcome');
    });

    // 접속이 끊어지면 발생 하는 이벤트
    // disconnect, disconnecting
    socket.on('disconnecting', ()=>{
        console.log("disconnecting ...");
        socket.rooms.forEach( (room) => {
           socket.to(room).emit("bye")
        });
    });
});