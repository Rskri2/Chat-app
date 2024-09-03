import { useSelector } from "react-redux";
import PropTypes from "prop-types";
const MessageCard = ({ msg }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={msg?.sender === user._id ? "text-right mb-2" : "mb-2"}>
      {msg?.imageUrl ? (
        <img
          alt="Erorr fetching the image"
          src={msg.imageUrl}
          className="inline-block pb-10 w-1/3"
        />
      ) : msg?.videoUrl ? (
        <video
          alt="Erorr fetching the image"
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

MessageCard.propTypes = {
  msg: PropTypes.object,
};

export default MessageCard;
