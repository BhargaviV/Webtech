const express = require('express');
const server = express();

server.set('PORT', 4001);
server.use(express.static('src'));

server.get('/', (req, res, next) => {
    res.sendFile('index.html',{root: './src'});
});

server.listen(server.get('PORT'), () => {
    console.log("Server is running ");
});
