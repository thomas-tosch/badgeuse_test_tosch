module.exports = function(app) {

    // let app = require('express')();
    let http = require('http').Server(app);
    let io = require('socket.io')(http);


    io.on('connection', (socket) => {

        // Log whenever a user connects
        console.log('user connected');

        // Log whenever a client disconnects from our websocket server
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


        socket.on('presence', (content) => {
            // console.log('presence');
            io.emit('presence', content)
        });
    });

    // Initialize our websocket server on port 5000
    http.listen(5000, () => {
        console.log('Socket.io started on port 5000');
    });
}
