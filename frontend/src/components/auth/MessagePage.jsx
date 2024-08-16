import  {  useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import {  useSelector } from "react-redux";
import {
  SendOutlined
} from '@ant-design/icons';
import MessageCard from "./MessageCard"
import { useParams } from 'react-router-dom';
import {  Layout,message,Input} from 'antd';
import wallpaper from "./wallpaper.jpeg"
export default function MessagePage({ socket}) {
    const { user} = useSelector((state) => state.auth);
  const [Msg, setMessage] = useState("")
  const [allMessage, setAllMessages] = useState([])


  const onChange = (e) => {
    setMessage(e.target.value);
  };
  message.config({
    duration:2
  })
  const { TextArea } = Input;
const {  Content} = Layout;

const params = useParams();
  const sendMessage = (e) => {
    e.preventDefault();
    const Message = {text:Msg,sender:user?._id, receiver:params.id}
    socket.emit('new-message', Message);
   
  };
 
  useEffect(() => {
    
    if (socket) {
      socket.emit('message-page', params.id);

      const handleMessage = (data) => {
      
        setAllMessages(data);
      };
      
      socket.on('message', handleMessage);

    }
  }, [socket, params.id]);

  return (
       <Content
          style={{
           
            overflow: 'initial',
            minHeight:"100vh",
            paddingLeft:"30%",
            backgroundImage:`url(${wallpaper})`
          }}
          className='w-full flex flex-col '
        >

          {
            allMessage.map((msg, index)=>{
              return(
                <MessageCard key = {index} msg={msg}/>
        
              )
            })
          }
          <Content className='flex flex-row align-bottom'>
            <TextArea allowClear onChange={onChange} width="100%" className='focus-none text-xl' style={{focus:{outline:"none"}, height:"50px",background:"white"}} >
            </TextArea>
            <SendOutlined width = "5%"style={{ fontSize: '40px', background:"white", height:"50px" }} onClick={sendMessage}/>
            </Content>
          </Content>
  )
}

MessagePage.propTypes = {
    socket: PropTypes.object
  };