import { GoogleGenerativeAI } from "@google/generative-ai";
import PropTypes from "prop-types";
const api = import.meta.env.VITE_GEMINI_API_KEY;
import { useState } from "react";
import { Layout, message } from "antd";
import wall from "./wall.jpeg";
export default function ChatBot() {
  const [Msg, setMessage] = useState("");
  const [req, setReq] = useState(null);
  const [res, setResponse] = useState(null);
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  message.config({
    duration: 2,
  });

  const { Content } = Layout;
  const getResponse = async () => {
    const genAI = new GoogleGenerativeAI(api);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });
    let result = await chat.sendMessage(Msg);
    setReq(Msg);
    setMessage("");
    console.log(result.response.text());
    setResponse(result.response.text());
  };

  return (
    <div>
      <div></div>
      <Content
        style={{
          overflow: "initial",
          minHeight: "100vh",
          paddingLeft: "10%",
          backgroundImage: `url(${wall})`,
        }}
        className="w-full flex flex-col "
      >
        <div id="chatbox" className="p-4 h-80 overflow-y-auto min-h-screen">
          {req && (
            <div className="text-left mb-2">
              <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                {req}
              </p>
            </div>
          )}
          {res && (
            <div className="text-right mb-2">
              <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                {res}
              </p>
            </div>
          )}
          <div className="p-4 border-t flex absolute bottom-0 w-[80%]">
            <input
              id="user-input"
              type="text"
              value={Msg}
              placeholder="Type a message"
              className="w-full px-3 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={onChange}
            />
            <button
              id="send-button"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              onClick={getResponse}
            >
              Send
            </button>
          </div>
        </div>
      </Content>
    </div>
  );
}
ChatBot.propTypes = {
  socket: PropTypes.object,
};
