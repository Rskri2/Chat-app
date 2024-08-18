import { Layout, Avatar, Modal, message, Badge } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { fetchAll } from "../redux/authReducer";
export default function SideBar({ socket }) {
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
  const { user } = useSelector((state) => state.auth);
  const [allConversation, setallConversation] = useState([]); //had
  const dispatch = useDispatch();

  const { allUsers } = useSelector((state) => state.auth);

  useEffect(() => {
    if (socket) {
      try{
        socket.emit("sidebar", user?._id);
        socket.on("conversation", (data) => {
          if (data && Array.isArray(data)) {
            const conversationData = data.map((conv) => {
              if (conv?.sender?._id != user?._id) {
                return {
                  conv,
                  userDetails: conv.sender,
                };
              } else {
                return {
                  conv,
                  userDetails: conv.receiver,
                };
              }
            });
            setallConversation(conversationData);
          }
        });

      } catch(err){
        message.error(err);
      }
    }
    const fetch = async () => {
      const res = await dispatch(fetchAll());
      if (res.error) message.error(res.error);
    };
    fetch();
  }, [socket, user]);

  return (
    <>
      <Sider width="20%" style={siderStyle}>
        <div className="border-b-2 py-4 px-2">
          <input
            type="text"
            placeholder="Explore more users.."
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            onClick={showModal}
          />
        </div>

        <Modal
          className="right-0"
          open={openEdit}
          onCancel={handleCancelEdit}
          footer={[]}
        >
          {allUsers && Array.isArray(allUsers) &&
            allUsers.map((user) => {
              return (
                <NavLink to={"/my-account" + "/" + user?._id}
                  key={user?._id}
                   style={{ textDecoration: 'none' }}
                   className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-gray-500')}
                
                >
                  <div className="w-1/4">
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                    
                  </div>
                  <div className="w-full">
                    <div className="text-lg font-semibold">{user?.name}</div>
                  </div>
                </NavLink>
              );
            })}
        </Modal>

        {allConversation && Array.isArray(allConversation) && 
        allConversation.map((conv) => {
          return (
            <NavLink to = {"/my-account" + "/" + conv?.userDetails?._id}
              key={conv?.userDetails?._id}
              style={{ textDecoration: 'none' }}
              className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
             
            >
              <div className="w-1/4">
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              </div>
                <Badge count={conv?.conv?.unseenMsg}/>
              <div className="w-full">
                <div className="text-lg font-semibold">
                  {conv?.userDetails?.name}
                </div>

                <span className="text-gray-500">
                  {conv?.conv?.lastMsg?.text}
                </span>
              </div>
            </NavLink>
          );
        })}
      </Sider>
    </>
  );
}

SideBar.propTypes = {
  socket: PropTypes.object,
};
