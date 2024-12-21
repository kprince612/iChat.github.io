const io = require ("socket.io") (8000)
let count = 1;

const users = {};

io.on ("connection", socket =>{
    socket.on ('new-user-joined', name =>{
        console.log ("New user", name)
        users[socket.id] = name;
        socket.broadcast.emit ("user-joined", name)
        io.emit ("user-count", count)
        count++;
    })

    socket.on ("send", message =>{
        socket.broadcast.emit ("receive", {message: message, name: users[socket.id]})
    })

    socket.on ("disconnect", message =>{
        socket.broadcast.emit ("leave", users[socket.id]);
        delete users[socket.id];
        count--;
        io.emit ("user-count", count);
    })

    // socket.on ("connect", () => {
    //     socket.broadcast.emit ("co", count)
    // })
})