const socket = io();

// DOM elements
const output = document.getElementById("outputs");
const actions = document.getElementById("actions");
const username = document.getElementById("username");
const message = document.getElementById("message");
const btn = document.getElementById("send");

btn.addEventListener("click", (e) => {
    e.preventDefault();
  socket.emit("chat:message", {
    username: username.value,
    message: message.value,
  });
  message.value = "";
});

message.addEventListener("keydown", () => {
  setTimeout(() => {
    if (message.value) {
        socket.emit("chat:typing", username.value);
      } else {
        socket.emit("chat:typing", "");
      }
  }, 0);

 
});

socket.on("chat:message", (data) => {
  actions.innerHTML = "";
  output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

socket.on("chat:typing", (data) => {
  if (data) {
    actions.innerHTML = `<p> <em>${data} is typing a message...</em></p>`;
  } else {
    actions.innerHTML = "";
  }
});
