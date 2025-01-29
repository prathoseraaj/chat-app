const socket = io()

const messagecontainer = document.getElementById('message-container')
const nameinput = document.getElementById('name-input')
const messageform = document.getElementById('message-form')
const messageinput = document.getElementById('message-input')
let currentRoom = null;

messageform.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
})

const roominput = document.getElementById('room-input');
document.getElementById('join-room').addEventListener('click', () => {
    const roomID = roominput.value.trim() || Date.now().toString();  
    if (currentRoom !== roomID) {  
        socket.emit('joinRoom', roomID);  
        currentRoom = roomID;  
        document.getElementById('room-name').textContent = `Room: ${roomID}`;  // Update room name display
    }
});

socket.on('client-total', (data) => {
    console.log(`Total client: ${data}`)
    document.getElementById('clients-total').innerHTML = `Total Clients: ${data}`
})

function sendMessage() {
    if (messageinput.value === '') return
    if (!currentRoom) {
        alert('Please join a room first!');
        return;
    }
    console.log(messageinput.value);
    const data = {
        name: nameinput.value,
        message: messageinput.value,
        datetime: new Date(),
        room: currentRoom,
    }
    socket.emit('message', data)
    addmessage(true,data)
    messageinput.value = '';
}

socket.on('chat-message', (data) => {
    console.log(data)
    addmessage(false,data)
})

function addmessage(isownmessage, data) {
    clearfeedback()
    const element = `
    <li class="${isownmessage ? 'message-right' : 'message-left'}">
        <p class="message">${data.message} </p>
        <span id="spann">${data.name} ● ${moment(data.dateTime || new Date()).fromNow()}</span>
    </li>`

    messagecontainer.innerHTML += element
    scrolltobutton()
}

function scrolltobutton(){
    messagecontainer.scrollTo(0, messagecontainer.scrollHeight)
}

messageinput.addEventListener('focus',(e) =>{
    socket.emit('feedback',{
        feedback: `${nameinput.value} is typing a message`
    })
})
messageinput.addEventListener('keypress',(e) =>{
    socket.emit('feedback',{
        feedback: `${nameinput.value} is typing a message`
    })
})
messageinput.addEventListener('blur',(e) =>{
    socket.emit('feedback',{
        feedback: ``
    })
})

socket.on('feedback',data => {
    clearfeedback()
    const element = `
    <li class="message-feedback">
        <p class="feedback" id="feedback">
            ${data.feedback} 
         </p>
    </li>`

    messagecontainer.innerHTML += element
})

function clearfeedback(){
    document.querySelectorAll('.message-feedback').forEach(element=>{
    element.parentNode.removeChild(element)
    })
}