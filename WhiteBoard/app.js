const express=require("express");
const socket= require("socket.io");

const app= express();

app.use(express.static("public"));

let port = process.env.PORT || 3030;

let server=app.listen(port,() =>{
    console.log("listing toooo");
});

let io=socket(server);

io.on("connection",(socket)=>{
    console.log("Made socket");
    socket.on("beginPath",(data)=>{
        io.sockets.emit("beginPath",data);
    })

    socket.on("drawStroke",(data)=>{
        io.sockets.emit("drawStroke",data);
    })

    socket.on("redoUndo",(data)=>{
        io.sockets.emit("redoUndo",data);
    })

    socket.on("mouseUp",(data)=>{
        io.sockets.emit("mouseUp",data);
    })
})
