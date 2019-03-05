const user = require("../models/user");

const socket = (req,res,next) =>{
    req.app.io.on('connection',function(socket){
        const socketId = socket.id;
        const userId = req.user._id;
        user.findById(userId)
        .then((user)=>{
            var socketIds = user.socketIds;
        });
    })








}