import PropTypes from "prop-types";
import React from "react";
const MessageCardComponent = ({ msg, user }) => {
  return (
    <div className={msg?.sender === user._id ? "text-right mb-2" : "mb-2"}>
      {msg?.imageUrl ? (
        <img
          alt="Error fetching the image"
          src={msg.imageUrl}
          className="inline-block pb-10 w-1/3"
        />
      ) : msg?.videoUrl ? (
        <video
          alt="Error fetching the image"
          src={msg.videoUrl}
          className="inline-block pb-10 w-1/3"
          controls
        />
      ) : (
        <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
          {msg?.text}
        </p>
      )}
    </div>
  );
};

MessageCardComponent.propTypes = {
  msg: PropTypes.object,
  user: PropTypes.string,
};

const MessageCard = React.memo(MessageCardComponent);

export default MessageCard;
