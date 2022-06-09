const socket = io();

const form = document.querySelector("#welcome form");


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input');
    let value = input.value;
    // 입력 된 값을 서버 소켓으로 전달 (emit() ---> on() )
    socket.emit('enter_room', value);
    input.value = "";
});

socket.on('echo', (serverMsg)=>{
    console.log(serverMsg);
});