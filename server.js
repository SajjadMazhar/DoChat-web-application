// creating server
const express = require("express");
const app = express();
const http = require("http").createServer(app);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname+"/public"));

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html")
})

http.listen(port, ()=>{
    console.log("listening to port ", port);
})

// creating socket.io connections
const io = require("socket.io")(http);

io.on("connection", (socket)=>{
    console.log("connected...");
      // receiving message
    socket.on("message", (msge)=>{

        //broadcasting the msge received from user
        socket.broadcast.emit("message", msge);
        
    });
    socket.on("username", (user)=>{
        socket.broadcast.emit("username",user);
    })
}) 