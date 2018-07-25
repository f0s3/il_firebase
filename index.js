let database = firebase.database();
let messagesRef = database.ref('/messages');
messagesRef.on('child_added', (data) => {
  appendMessage(data.val())
})


let messageList = document.querySelector('#messages');
function appendMessage(message) {
    if (isEmpty(message)) return;
    let messageNode = createMessageNode(message);
    messageList.appendChild(messageNode);
    messageNode.scrollIntoView(false);
    return messageNode;
}

function isEmpty(text) {
    return !/\S/.test(text);
}

let msgTmpl = document.querySelector('#message-template')
    .content
    .querySelector('.message');
function createMessageNode(message) {
    let messageNode = document.importNode(msgTmpl, true);
    let time = new Date(message.timestamp).toLocaleTimeString();
    console.log(message);
    messageNode.querySelector('.body').textContent = message.body;
    messageNode.querySelector('.time').textContent = time;
    return messageNode;
}

let messageForm = document.querySelector('#message-form');
messageForm.onsubmit = (event) => {
    event.preventDefault();
    let messageInput = messageForm.elements['message'];
    let message = {
      body: messageInput.value,
      timestamp: Date.now()
    }
    if (messageInput.value !== "") {
        messagesRef.push(message)
    }

    messageForm.reset();
    messageInput.focus();
};
