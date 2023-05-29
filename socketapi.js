const io = require("socket.io")();
const say = require('say')
const socketapi = {
    io: io
};
var arrname = [];
var arrid = [];
var connections = 0;
var arr=[];

io.on("connection", function (socket) {

    io.emit('online-users', arrname);

    socket.on('join', function (naam) {
        arr[socket.id]=naam;
        arrid.push(socket.id);
        arrname.push(naam);
        socket.broadcast.emit('user-joined', naam);
        socket.emit('i-joined', naam);
        //console.log("new user connected , connected users->" + arrname);
        io.emit('online-users-2', arrname);
    })

    socket.on('message', function (msg) {     
        
        socket.broadcast.emit('send-msg', { data: msg, username: arr[socket.id] });
        socket.emit('self-msg',{data:msg});
    })

socket.on('speak-msg',function(data){
    say.speak(data, 'Microsoft David Desktop', 1);
})
socket.on('self-speak',function(data){
    say.speak(data, 'Microsoft Zira Desktop', 1);
})

  //say.speak("hi there this is a new voice line", 'Microsoft David Desktop', 0.5);
  //say.speak("hi there this is a new voice line", 'Microsoft Zira Desktop', 0.5);


socket.on('e1',function(){
    socket.broadcast.emit('recieve-e1',{username: arr[socket.id]});
    socket.emit('send-e1');
})
socket.on('e2',function(){
    socket.broadcast.emit('recieve-e2',{username: arr[socket.id]});
    socket.emit('send-e2');
})
socket.on('e3',function(){
    socket.broadcast.emit('recieve-e3',{username: arr[socket.id]});
    socket.emit('send-e3');
})
socket.on('e4',function(){
    socket.broadcast.emit('recieve-e4',{username: arr[socket.id]});
    socket.emit('send-e4');
})
socket.on('e5',function(){
    socket.broadcast.emit('recieve-e5',{username: arr[socket.id]});
    socket.emit('send-e5');
})

    socket.on('disconnect', function () {
        let indexOfdeleteduser = arrid.indexOf(socket.id);
        var user = arrname[indexOfdeleteduser];
        console.log(user);
        io.emit('left', arr[socket.id]);
        arrname.splice(indexOfdeleteduser, 1);
        arrid.splice(indexOfdeleteduser, 1);
        console.log(" user left connected users now " + arrname);
        io.emit('online-users-2', arrname);
    })
})

module.exports = socketapi;


