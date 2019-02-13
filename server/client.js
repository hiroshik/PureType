const io = require('socket.io-client');

const socket = io('http://localhost:3000?name=' + process.argv[2]);

socket.on('connect', () => {
    console.log(socket.connected);
});

socket.on('game-room', (data) => {
    console.log('Room change', data);
});


socket.on('message', (data) => {
    console.log(data);
});

setInterval(() => {
    console.log('Sending word');
    socket.emit('score', {
        word: 'pumpkin',
        time: Math.floor(Math.random() * Math.floor(1000))
    });
}, 3000);

socket.on('leaderboard', (data) => {
    console.log('Leaderboard', data);
});

socket.on('new-word', (data) => {
    console.log('Retrieved new word', data);
});