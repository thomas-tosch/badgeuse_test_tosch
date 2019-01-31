module.exports = function(app) {

    // let app = require('express')();
    let http = require('http').Server(app);
    let io = require('socket.io')(http);


    io.on('connection', (socket) => {

        socket.on('pseudo', (pseudo)=>{
            io.pseudo = pseudo;
            io.emit('pseudo', pseudo);

            console.log(pseudo, ' is connected');
        });



        // Log whenever a client disconnects from our websocket server
        socket.on('disconnect', () => {
            io.emit('disconnect', io.pseudo);
            console.log(io.pseudo, ' is disconnected');
        });


        socket.on('presence', (content) => {
            // console.log('presence');
            io.emit('presence', content)
        });
    });

    // Initialize our websocket server on port 5000
    http.listen(5000, () => {
        console.log('Socket.io is started on port 5000');
    });
}
