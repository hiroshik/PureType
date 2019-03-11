const io = require('socket.io-client');

const socket = io('http://localhost:4000?name=' + process.argv[2]);

socket.on('connect', () => {
    console.log(socket.connected);
});

socket.on('game-room', (data) => {
    console.log('Room change', data);
});


socket.on('message', (data) => {
    console.log('Server message', data);
});

setInterval(() => {
    console.log('Sending word');
    socket.emit('score', {
        totalTime: Math.floor(Math.random() * Math.floor(30000)),
        userName: process.argv[2]
    });
}, 3000);

socket.on('leaderboard', (data) => {
    console.log('Leaderboard', data);
});

socket.on('words', (data) => {
    console.log('Retrieved new word', data);
});