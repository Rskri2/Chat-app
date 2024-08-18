import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import MessageCard from "./MessageCard";
import { useParams } from "react-router-dom";
import { Layout, message, } from "antd";
import wall from "./wall.jpeg";
export default function MessagePage({ socket }) {
  const { user } = useSelector((state) => state.auth);
  const [Msg, setMessage] = useState("");
  const [allMessage, setAllMessages] = useState([]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  message.config({
    duration: 2,
  });

  const { Content } = Layout;

  const params = useParams();
  const sendMessage = (e) => {
    e.preventDefault();
    const Message = { text: Msg, sender: user?._id, receiver: params.id };
    socket.emit("new-message", Message);
  };

  useEffect(() => {
    if (socket) {
      try{
        socket.emit("message-page", params.id);
  
        const handleMessage = (data) => {
          setAllMessages(data);
        };
  
        socket.on("message", handleMessage);

      } catch(err){
        message.error(err);
      }
    }
  }, [socket, params.id]);

  return (
    <>
      <Content
        style={{
          overflow: "initial",
          minHeight: "100vh",
          paddingLeft: "30%",
          backgroundImage: `url(${wall})`,
        }}
        className="w-full flex flex-col "
      >
        <div id="chatbox" className="p-4 h-80 overflow-y-auto min-h-screen">
          {allMessage && Array.isArray(allMessage) && 
            allMessage.map((msg, index) => {
              return <MessageCard key={index} msg={msg} />;
            })}
          <div className="p-4 border-t flex absolute bottom-0 w-[65%]">
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={onChange}
            />
            <button
              id="send-button"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </Content>
    </>
  );
}

MessagePage.propTypes = {
  socket: PropTypes.object,
};
