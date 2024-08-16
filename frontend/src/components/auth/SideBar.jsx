import { Layout, Avatar, Card,Modal,message,Badge } from "antd";
import { useEffect, useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {  fetchAll } from "../redux/authReducer";
const { Meta } = Card;
export default function SideBar({  socket,changeReceiver }) {

  const [openEdit, setOpenEdit] = useState(false);
  const showModal = () => {
    setOpenEdit(true);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const { Sider } = Layout;
  const siderStyle = {
    height: "100vh",
    position: "fixed",
    insetInlineStart: 0,
    left: "80px",
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "unset",
    background: "white",
  };
  const { user} = useSelector((state) => state.auth);
  const [allUser, setAllUser] = useState([]);
  const dispatch = useDispatch();
   
    const {allUsers} = useSelector((state)=>state.auth)
  // const [openSearch, setOpenSearch] = useState(false);
  const setModalClose = ()=>{
    changeReceiver();
    handleCancelEdit();
  }
  useEffect(()=>{
    if(socket){
          socket.emit('sidebar', user?._id);
          socket.on('conversation', (data)=>{
            if(data){
              const conversationData = data.map((conv)=>{
                  if(conv?.sender?._id != user?._id){
                      return {
                          conv,
                          userDetails:conv.sender
                      }
                  }
                  else{
                      return {
                          conv,
                          userDetails:conv.receiver
                      }
                  }
              })
              setAllUser(conversationData)}
          })

      }
      const fetch = async ()=>{
        const res = await  dispatch(fetchAll());
        if(res.error)message.error(res.error)
      }
      fetch();
  },[socket, user])

  return (
    <Sider width="20%" style={siderStyle}>
      <div className="text-3xl">
        Chats
        <Card width="20%" >
            
              <Meta
                onClick={showModal}
                title=  "Explore some more users"
              />
            </Card>
      </div>
      <Modal
        className="right-0"
        open={openEdit}
        
        onCancel={handleCancelEdit}
        footer={[]}
      >
        {allUsers.map((user, index) => {
        return (
          <NavLink
            to={"/my-account" + "/" + user?._id}
            key={user?._id}
            onClick={setModalClose}

          >
            <Card width="20%" key={index}>
           
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title={user?.name}
                
              />
            </Card>
          </NavLink>
        );
      })}
      </Modal>
   
      {allUser.map((conv, index) => {
        return (
          <NavLink
            to={"/my-account" + "/" + conv?.userDetails?._id}
            key={conv?.userDetails?._id}
            onClick={changeReceiver}
          >
            <Card width="20%" key={index}>
            <Badge count={conv?.unseenMsg}  />
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title={conv?.userDetails?.name}
                description={conv?.lastMsg?.text}
              
              />
            </Card>
          </NavLink>
        );
      })}
    </Sider>
  );
}

SideBar.propTypes = {
  socket: PropTypes.object,
  changeReceiver:PropTypes.func
};
