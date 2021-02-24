const socket = io();

let user;
let textarea = document.querySelector("#textarea");
let messgeArea = document.querySelector(".message__area");

do {
  user = prompt("لطفا نام خود را وارد کنید:");
} while (!user);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: user,
    message: message.trim()
  };

  appendMessage(msg, "outgoing");
  textarea.value = ''
  scrollToBottom()

  //Send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `;

  mainDiv.innerHTML = markup;
  messgeArea.appendChild(mainDiv);
}


//Recive message

socket.on('message' , (msg) => {
    appendMessage(msg , 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messgeArea.scrollTop = messgeArea.scrollHeight
}