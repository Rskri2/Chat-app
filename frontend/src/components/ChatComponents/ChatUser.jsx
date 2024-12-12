import React from 'react'
import MessagePage from "./MessagePage";
import chatlogo from "./chatlogo.jpg";
import PropTypes from "prop-types";
export default function ChatUser({id, socketCon, user}) {
  return (
    <div>
      {!id && (
        <img
        src={chatlogo}
          style={{ paddingLeft: "20%" }}
          className="w-full h-screen"
        />
      )}
      { id && <MessagePage socket={socketCon} user={user} id = {id}/>}
    </div>
  )
}

ChatUser.propTypes = {
    id:PropTypes.object,
    socketCon: PropTypes.object,
    user:PropTypes.string
};