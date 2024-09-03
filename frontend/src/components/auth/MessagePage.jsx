import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import MessageCard from "./MessageCard";
import { useParams } from "react-router-dom";
import { Layout, message, Upload } from "antd";
import {
  ShareAltOutlined,
} from "@ant-design/icons";
import axios from "axios";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
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
        
       if(file.type.startsWith('image/') && response.data.secure_url){
         const Message = { sender: user?._id, receiver: params.id, imageUrl:response.data.secure_url};
         socket.emit("new-message", Message);
        }
        else{
          const  Message = { sender: user?._id, receiver: params.id, videoUrl:response.data.secure_url};
          console.log(Message);
          socket.emit("new-message", Message);
       }
      } catch (error) {
        message.error(error);
      }

    }
  };
  useEffect(() => {
    if (socket) {
      try {
        socket.emit('seen', params.id);
        socket.emit("message-page", params.id);

        const handleMessage = (data) => {
          setAllMessages(data);
        };
        socket.on("message", handleMessage);
      } catch (err) {
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
          {allMessage &&
            Array.isArray(allMessage) &&
            allMessage.map((msg, index) => {
              return <MessageCard key={index} msg={msg} />;
            })}
          <div className="p-4 border-t flex absolute bottom-0 w-[65%]">
            <Upload customRequest={handleCustomRequest} maxCount={1} showUploadList={false}>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-l-md hover:bg-blue-600 transition duration-300"
                onClick={sendMessage}
              >
                <ShareAltOutlined />
              </button>
            </Upload>
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-500"
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
