# **Real-Time Chat Application**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Socket.io](https://img.shields.io/badge/socket.io-4.0.0-blue)](https://socket.io/)
[![Node.js](https://img.shields.io/badge/node.js-14.x.x-green)](https://nodejs.org/)

This is a real-time chat application built using **Socket.io** and **Node.js**. Users can join chat rooms, send messages, and see real-time updates of who is typing. The backend is built with **Node.js** and **Express**, while the frontend is plain **HTML/CSS/JS** interacting with **Socket.io** for communication.

## Features

- Real-time messaging in chat rooms.
- Multiple rooms can be joined with unique room IDs.
- Displays total number of connected clients in the app.
- Typing indicator to show when someone is typing a message.
- Responsive and user-friendly interface.

## **Tech Stack**

- **Frontend**: HTML, CSS, JavaScript, Socket.io client
- **Backend**: Node.js, Express, Socket.io
- **Real-time Communication**: Socket.io

Make sure you have the following installed:

- Node.js (v14.x or higher)
- NPM (Node Package Manager)

### **Clone the repository**

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
npm install
nodemon server.js
```
## Usage

- **For Users**:
 1.Enter a username and a room ID.
 2.Click Join Room to enter the chat room.
 3.Start chatting with others in the room.
 4.Use the Message input field to send messages.
 5.You'll be notified when someone is typing.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add feature description'
   ```
4. Push your changes:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

[MIT License](https://opensource.org/licenses/MIT)
