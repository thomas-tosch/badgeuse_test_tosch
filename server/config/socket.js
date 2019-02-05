module.exports = function(app) {

    let http = require('http').Server(app);
    let io = require('socket.io')(http);


    io.on('connection', (socket) => {

        // Send a signal for execute a refresh function
        socket.on('presence', (content) => {
            io.emit('presence', content);
        });
    });

    // Initialize our websocket server on port 5000
    http.listen(5000, () => {
        console.log('Socket.io is started on port 5000');
    });
}
