import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  LogoutOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import axios from 'axios'
import { Menu, Layout, Upload,message, Button,Modal,Avatar} from 'antd';
import io from 'socket.io-client';
import { logoutUser,fetchUser,setOnlineUser, updateUser } from '../redux/authReducer';

import SideBar from "./SideBar";
import MessagePage from  "./MessagePage"
import { useParams } from 'react-router-dom';
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
export  default function ChatLayout (){
  
  const {user} = useSelector((state)=>state.auth);
  
  const {id} = useParams();
  message.config({
    duration:2
  })
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    dispatch(logoutUser());
    message.success("Logged out");
    
  };
  const handleCustomRequest = async ({ file, onSuccess, onError }) => {

      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
       
        const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "chat_app");

        try {
          const response = await axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response)
          if(response.data.secure_url) dispatch(updateUser({photo:response.data.secure_url}))
        } catch (error) {
          message.error(error);
        }
  
      }
    };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  

  const items2 = [
    {
      key: '1',
      icon: <MessageOutlined/>,
    },
    {
      key: '2',
      icon: <Avatar src={user?.photo} />,
      onClick:showModal
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      onClick:handleLogout

    },
    
  ];
  const [socketCon, setSocketCon] = useState(null);
 
  useEffect(()=>{
    const fetch = async ()=>{
      const res = await  dispatch(fetchUser());
      if(res.error)message.error(res.error)
    }
    fetch();
    const token = localStorage.getItem('token');
    
     const socket = io('http://127.0.0.1:5000',{
      auth:{
        token:token
      }
    });
    socket.on('connect', ()=>{
      setSocketCon(socket);
    })
    socket.on('onlineUser', (onlineUser)=>{
      dispatch(setOnlineUser(onlineUser));
    })
  },[])
  return (
    <>
    <Layout hasSider>
      
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={true}
        items={items2}
        className="bg-gray-800 fixed min-h-screen"
        width="10%"
      />
        <SideBar socket={socketCon} 
         />
       
        {
          id && 
        <MessagePage socket={socketCon} />
        }
      </Layout>

      <Modal title={user?.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
      <Upload
      customRequest={handleCustomRequest}
      maxCount={1}
  >
    
    <Button icon={<Avatar src={user?.photo}/>} className='w-full' ></Button>
  </Upload>
      </Modal>
    </>
  );
}
