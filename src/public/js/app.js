const socket = io();

const form = document.querySelector("#welcome form");


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input');
    let value = input.value;
    // 입력 된 값을 서버 소켓으로 전달 (emit() ---> on() )
    socket.emit('enter_room', value, "하하하하하", "호호호호호", function(msg2) {
        console.log("서버 메세지 전달 받기 완료! ", msg2);
    });
    input.value = "";
});

socket.on('echo', (serverMsg)=>{
    console.log(serverMsg);
});