module.exports = function(app) {

    let http = require('http').Server(app);
    let io = require('socket.io')(http);


    io.on('connection', (socket) => {

        /**
         * send a signal for refresh the user list of presence
         */
        socket.on('presence', (content) => {
            io.emit('presence', content);
            console.log('presence', content);
        });

        /**
         * send a signal for refresh the number of absence in wait
         */
        socket.on('absenceList', (content) => {
            io.emit('absenceList', content);
            console.log('absenceList', content);
        });
    });

    // Initialize our websocket server on port 5000
    http.listen(5000, () => {
        console.log('Socket.io is started on port 5000');
    });
}
