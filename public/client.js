const socket = io();

let user;
let textArea = document.querySelector("#textarea");
let msgeArea = document.querySelector(".message__area");



do{
    user = prompt("Enter your name:");

}while(!user)
socket.emit("username", user);

const appendUser = (userName)=>{
    let joined = document.querySelector(".joined__users ul");
    let li = `<li>${userName}</li>`;
    joined.innerHTML+=li;
}



const appendMessage = (msge, type) =>{
    let msgDiv = document.createElement("div");
    let className = type;
    msgDiv.classList.add(className, "message");

    let msgStrip = `
        <h4>${msge.user}</h4>
        <p>${msge.message}</p>
    `
    msgDiv.innerHTML = msgStrip;
    msgeArea.appendChild(msgDiv);

}

const sendMessage = (msge)=>{
    let message = {
        user: user,
        message: msge.trim()
    }
    // appending message
    appendMessage(message, "outgoing");
    scrollDown();
    
    //sending to server via socket.io
    socket.emit("message", message);
}

const scrollDown = ()=>{
    msgeArea.scrollTop = msgeArea.scrollHeight;
}



textArea.addEventListener("keyup", (e)=>{
    if(e.key === "Enter"){
        sendMessage(e.target.value);
        textArea.value = "";
    }
})       

// receiving the message broadcasted from the server
socket.on("message", (msge)=>{
    appendMessage(msge, "incoming");
    scrollDown();
})

socket.on("username", (user)=>{
    appendUser(user);
})