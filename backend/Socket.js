const express = require('express');
const {Server} = require('socket.io');
const jwt = require("jsonwebtoken");
const http = require('http');
const { promisify } = require("util");
const User = require('./model/User')
const {Message} = require('./model/Message')
const {Conversation} = require('./model/Conversation');
const AppError = require('./utils/AppError');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:process.env.FRONTEND_URL,
        credentials:true
    }
});

const onlineUser = new Set();
const userSocketMap = {}; 

const getUser = async (token)=>{
      if (!token) {
        return next(
          new AppError("You are not logged in!Please log in to access", 401)
        );
      }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    const freshUser = await User.findById(decoded.id);
    return freshUser;
}

const getConverstionById = async(userId)=>{
   
    const conversation = await Conversation.find({
        "$or":[
            {sender:userId},
            {receiver:userId}
        ]
    }).sort({updatedAt:-1})
    
    const conv = conversation.map((curr)=>{
        const unseen = curr?.msg?.reduce((prev, curr)=>{
            const msgBy = curr?.sender?.toString();
            if(msgBy !== userId){
                return  prev + (curr?.seen ? 0 : 1)
            }else{
                return prev
            }
        }, 0)   
        return {
        _id:curr?._id,
        sender:curr?.sender,
        receiver:curr?.receiver,
        unseenMsg:unseen,
        lastMsg:curr.msg[curr?.msg?.length-1]
        }
    });

    return conv;

}


io.on('connection', async(socket)=>{
     const token = socket.handshake.auth.token;

    const user =  await getUser(token);
    userSocketMap[user?._id] = socket.id
    socket.join(user?._id.toString());
    onlineUser.add(user?._id.toString());
    io.emit('onlineUser',Array.from(onlineUser));

    socket.on('message-page', async (userId)=>{
        
        const userDetails = await User.findById(userId);
        
        const payload = {
            _id:userDetails?._id,
            name:userDetails?.name,
            email:userDetails?.email,
            photo:userDetails?.photo,
            online:onlineUser.has(userDetails?._id),
        };

        socket.emit('message-user', payload);
        
        const conv = await Conversation.findOne({
            $or:[
                {sender:user?._id, receiver:userId},
                {receiver:user?._id, sender:userId}
            ]
        }).sort({updatedAt:-1})
        const getConversationMessage = await Message.find({
            $or:[
                {sender:userId, receiver:user?._id},
                {sender:user?._id, receiver:userId}
            ]
        })
        io.to(userSocketMap[user?._id]).emit('message', getConversationMessage)
        io.to(userSocketMap[userId]).emit('message', getConversationMessage)
        const senderConverstion = await getConverstionById(user?._id);
        const receiverConversation = await getConverstionById(userId);
        io.to(userSocketMap[user?._id]).emit('conversation', senderConverstion)
        io.to(userSocketMap[userId]).emit('conversation', receiverConversation)
    });

    socket.on('new-message', async(data)=>{
        let conversation = await Conversation.findOne({
            $or:[
                {sender:data?.sender, receiver:data?.receiver},
                {sender:data?.receiver, receiver:data?.sender}
            ]
        });
        if(!conversation){
            conversation = await Conversation.create({
                sender:data?.sender,
                receiver:data?.receiver
            })
        }
        const message = await Message.create({text:data?.text, sender:data?.sender, receiver:data?.receiver, imageUrl:data?.imageUrl, videoUrl:data?.videoUrl});
         // console.log(message);
        const updateConversation = await Conversation.updateOne({_id:conversation?._id},{
            "$push":{msg:message?._id}
        })
        const getConversationMessage = await Message.findOne({
      
            $or:[
                {sender:data?.sender, receiver:data?.receiver},
                {sender:data?.receiver, receiver:data?.sender}
            ]
        }).sort({updatedAt:-1})
        io.to(userSocketMap[data?.sender]).emit('message', getConversationMessage)
        io.to(userSocketMap[data?.receiver]).emit('message', getConversationMessage)

        const senderConverstion = await getConverstionById(data?.sender);
        const receiverConversation = await getConverstionById(data?.receiver);

        io.to(userSocketMap[data?.sender]).emit('conversation', senderConverstion)
        io.to(userSocketMap[data?.receiver]).emit('conversation', receiverConversation)
        

    })

    socket.on('sidebar', async(userId)=>{
        const conv = await getConverstionById(userId);
      //  console.log(conv)
        socket.emit('conversation', conv);
    })

    socket.on('seen', async(msgBy)=>{

        let conversation = Conversation.findOne({
            $or:[
                // {sender:user?._id, receiver:msgBy},
                {sender:msgBy, receiver:user?._id}
            ]
        })

        const conversationMsg = conversation?.msg || []

        await Message.updateMany(
            { _id : {"$in":conversationMsg}, sender:msgBy},
            {"$set":{seen:true}}
        )
        
        const senderConverstion = await getConverstionById(user?._id);
        const receiverConversation = await getConverstionById(msgBy);

        io.to(userSocketMap[user?._id.toString()]).emit('conversation', senderConverstion)
        io.to(userSocketMap[msgBy]).emit('conversation', receiverConversation)

    })

    socket.on('disconnect', ()=>{
        onlineUser.delete(user?._id?.toString())
    })

})
module.exports = {app, server};
