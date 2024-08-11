const express = require('express');
const {Server} = require('socket.io')
const http = require('http');
const { promisify } = require("util");
const User = require('./model/User')
const {Conversation, Message} = require('./model/Conversation');
const { Socket } = require('dgram');
const app = express();
const server = http.createServer(app);

// const io = new Server(server, {
//     cors:{
//         origin:process.env.FRONTEND_URL,
//         credentials:true
//     }
// })
// const onlineUser = new Set();
const getUser = async (token)=>{

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(
          new AppError("You are not logged in!Please log in to access", 401)
        );
      }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    const freshUser = await User.findById(decoded.id);
    return freshUser;
}

// const getConverstion = async(userId)=>{

// }
// io.on('connection', async(socket)=>{
    // console.log("Connected",socket._id);

    // const token = socket.handshake.auth.token;
    // const user = await getUser(token);
    // socket.join(user?._id.toString())
    // onlineUser.add(user?._id.toString());

    // io.emit('onlineUser',Array.from(onlineUser));

    // socket.on('message-page', async (userId)=>{
    //     const userDetails = await User.findById(userId);
    //     const payload = {
    //         _id:userDetails?._id,
    //         name:userDetails?.name,
    //         email:userDetails?.email,
    //         photo:userDetails?.photo,
    //         online:onlineUser.has(_id),
    //     };
    //     socket.emit('message-user', payload);
    //     const getConverstionalMessage = await Conversation.findOne({
    //         $or:[
    //             {sender:user?._id, receiver:userId},
    //             {receiver:user?._id, sender:userId}
    //         ]
    //     }).sort({updatedAt:-1})
    // });

    // socket.on('new-message', async(data)=>{
    //     let conversation = Conversation.findOne({
    //         $or:[
    //             {sender:user?._id, receiver:data?.receiver},
    //             {receiver:user?._id, sender:data?.sender}
    //         ]
    //     })
    //     if(!conversation){
    //         conversation = await Conversation.create({
    //             sender:data?.sender,
    //             receiver:data?.receiver
    //         })
    //     }

    //     const message = await Message.create(data)
    //     const updateConversation = await Conversation.updateOne({_id:conversation?._id},{
    //         "$push":{conversations:message?._id}
    //     })
    //     const getConversationMessage = await Message.findOne({
    //         $or:[
    //             {sender:user?._id, receiver:data?.receiver},
    //             {receiver:user?._id, sender:data?.sender}
    //         ]
    //     }).sort({updatedAt:-1})
    //     io.to(data?.sender).emit('message', getConversationMessage || [])
    //     io.to(data?.receiver).emit('message', getConversationMessage || [])

    //     const getConverstionSender = getConverstion(data?.sender);
    //     const getConverstionReceiver = getConverstion(data?.receiver);
    //     io.to(data?.sender).emit('conversation', getConverstionSender)
    //     io.to(data?.receiver).emit('conversation', getConverstionReceiver)
    // })

    // socket.on('sidebar', async(userId)=>{
    //     const conv = await getConverstion(userId);
    //     socket.emit('convesation', conv);
    // })

    // socket.on('seen', async()=>{

    // })
    // socket.on('disconnect', ()=>{
    //     onlineUser.delete(user?._id?.toString())
    //     console.log("Disconnected user", socket.id);
    // })
// })
module.exports = {app, server};