const socket = io()

const messagecontainer = document.getElementById('message-container')
const nameinput = document.getElementById('name-input')
const messageform = document.getElementById('message-form')
const messageinput = document.getElementById('message-input')

messageform.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
})

socket.on('client-total', (data) => {
    console.log(`Total client: ${data}`)
    document.getElementById('clients-total').innerHTML = `Total Clients: ${data}`
})

function sendMessage() {
    if (messageinput.value === '') return
    console.log(messageinput.value);
    const data = {
        name: nameinput.value,
        message: messageinput.value,
        datetime: new Date(),
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
    <li class=${isownmessage?"message-right":"message-left"}>
        <p class="message">${data.message} </p>
        <span>${data.name} ● ${moment(data.datetime).fromNow()}</span>
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