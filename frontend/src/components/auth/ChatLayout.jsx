import React, { useState } from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  MessageOutlined,
  UserAddOutlined,
  SendOutlined
} from '@ant-design/icons';
import {  Menu, theme, Layout, Upload,message,Input} from 'antd';

const { TextArea } = Input;
const { Header, Content, Sider } = Layout;
const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  left:'80px',
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
  background:"white"
};
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
message.config({
  duration:2
})
const handleLogout = () => {

  window.localStorage.removeItem("token");
  message.success("Logged out");


};

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
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

export  default function ChatLayout (){
  const onChange = (e) => {
    console.log(e);
  };
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout hasSider>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items2}
        className="bg-gray-800 fixed min-h-screen"
      />
         <Sider style={siderStyle}>
        <div className="demo-logo-vertical " />
        <div className='text-3xl text-center'>
          Messages
        </div>
        {/* <div className='text-center'>Explore userss to start conversation with
          </div> */}
        <Menu mode="inline"  defaultSelectedKeys={['4']} />
      </Sider>
      <Layout
        style={{
          marginInlineStart: 200,
        }}
      >
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            minHeight:"100vh"
          }}
        >

          {/* <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              display:'flex',
              
            }}
          > */}
            {/* <p>long content</p> */}
            {/* {
              Array.from(
                {
                  length: 100,
                },
                (_, index) => (
                  <React.Fragment key={index}>
                    {index % 20 === 0 && index ? 'more' : '...'}
                    <br />
                  </React.Fragment>
                ),
              )
            } */}
          {/* </div> */}
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'initial',
              backgroundImage: 'url("https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: 'cover',
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
            }}
          >
            {/* <p>long content</p>
            {
              Array.from(
                {
                  length: 100,
                },
                (_, index) => (
                  <React.Fragment key={index}>
                    {index % 20 === 0 && index ? 'more' : '...'}
                    <br />
                  </React.Fragment>
                ),
              )
            } */}
          </div>
        <div className='flex flex-row w-full pl-20 h-[50px]'>
        <TextArea  allowClear onChange={onChange} >
        </TextArea>
        <SendOutlined style={{ fontSize: '40px', background:"white" }} />

        </div>
        </Content>
      </Layout>

    </Layout>
  );
};
