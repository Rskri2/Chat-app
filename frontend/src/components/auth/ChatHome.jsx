import  { useEffect, useState } from 'react';4
import { useDispatch } from "react-redux";
import {
  UserOutlined,
  LogoutOutlined,
  MessageOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Menu, Layout, Upload,message} from 'antd';
import io from 'socket.io-client';
import { logoutUser,fetchUser,setOnlineUser } from '../redux/authReducer';
import SideBar from "./SideBar";
import chatlogo from "./chatlogo.jpg"
export  default function ChatHome (){


  message.config({
    duration:2
  })
  const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    dispatch(logoutUser());
    message.success("Logged out");
  
  };

  const items2 = [
    {
      key: '1',
      icon: <MessageOutlined/>,
      
    },
    {
      key: '2',
      icon: <UserAddOutlined />,
    },
    {
      key: '3',
      icon:   <Upload {...props}>
        <UserOutlined/>
    </Upload>,
      onClick:<Upload/>
      
    },
    {
      key: '4',
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
          <img src={chatlogo} style={{paddingLeft:"20%"}} className='w-full h-screen' />
         

      </Layout>
    </>
  );
}
