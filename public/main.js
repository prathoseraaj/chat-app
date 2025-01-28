const socket = io() 

socket.on('client-total',(data) =>{
    console.log(`Total client: ${data}`)
    document.getElementById('clients-total').innerHTML = `Total Clients: ${data}`
})