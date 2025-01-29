const socket = io() 

const messagecontainer = document.getElementById('message-container')
const nameinput = document.getElementById('name-input')
const messageform = document.getElementById('message-form')
const messageinput = document.getElementById('message-input')

messageform.addEventListener('submit',(e) =>{
    e.preventDefault();
    sendMessage();
})

socket.on('client-total',(data) =>{
    console.log(`Total client: ${data}`)
    document.getElementById('clients-total').innerHTML = `Total Clients: ${data}`
})

function sendMessage (){
    console.log(messageinput.value);
    const data = {
        name: nameinput.value,
        message: messageinput.value,
        datetime: new Date(),       
    }
    socket.emit('message',data)
}

