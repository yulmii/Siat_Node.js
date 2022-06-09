const socket = io();

const welcome = document.querySelector("#welcome");
const form = document.querySelector("#welcome form");
const room = document.querySelector("#room");
const roomForm = document.querySelector("#msg");
const nameForm = document.querySelector("#name");
const roomLegend = room.querySelector("legend");
const ul = room.querySelector('ul');

room.hidden = true;
welcome.hidden = false;

nameForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    // 메세지 보내기
    const input = nameForm.querySelector('input');
    let value = input.value;
    // 입력 된 값을 서버 소켓으로 전달 (emit() ---> on() )
    socket.emit('nickname', value);
    input.value = "";
})

roomForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    // 메세지 보내기
    const input = roomForm.querySelector('input');
    let value = input.value;
    // 입력 된 값을 서버 소켓으로 전달 (emit() ---> on() )
    socket.emit('new_message', value, (msg)=>{
        showMessage('You : ' + msg);
    });
    input.value = "";
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input');
    let value = input.value;
    // 입력 된 값을 서버 소켓으로 전달 (emit() ---> on() )
    socket.emit('enter_room', value, (roomName)=>{
        welcome.hidden = true;
        room.hidden = false;
        roomLegend.innerText = roomName + "방";
    });
    input.value = "";
});

// socket.on('echo', (serverMsg)=>{
//     console.log(serverMsg);
// });

function showMessage(msg) {
    let li = document.createElement('li');
    li.innerText = msg;
    ul.appendChild(li);
}

socket.on('welcome', (user) => {
    //console.log('welcome ...');
    showMessage(user + "님이 들어오셨습니다^^");
});

socket.on('bye', (user) => {
    //console.log("bye ...");
    showMessage(user + "님이 퇴장하셨습니다ㅠㅠ");
});

socket.on('message', (msg) => {
    //console.log("bye ...");
    showMessage(msg);
});