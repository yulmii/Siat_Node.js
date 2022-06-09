const socket = io();

const welcome = document.querySelector("#welcome");
const form = document.querySelector("#welcome form");
const room = document.querySelector("#room");
const roomForm = document.querySelector("#room form");
const roomLegend = room.querySelector("legend");
const ul = room.querySelector('ul');

room.hidden = true;
welcome.hidden = false;

roomForm.addEventListener('submit', (event)=>{
    event.preventDefault();
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

socket.on('welcome', () => {
    //console.log('welcome ...');
    let li = document.createElement('li');
    li.innerText = '어떤 분이 들어왔다!'
    ul.appendChild(li);
});

socket.on('bye', () => {
    console.log("bye ...");
});