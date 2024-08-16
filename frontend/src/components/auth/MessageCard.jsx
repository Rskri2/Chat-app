import {  useSelector } from "react-redux";
import { Card } from 'antd';
import PropTypes from "prop-types";

const MessageCard = ({ msg  }) => {
    const { user} = useSelector((state) => state.auth);
  const isSent = msg?.sender === user._id;

  const cardStyle = {
    margin: '10px',
    maxWidth: '100%',
    padding:"0px",
    backgroundColor: isSent ? '#E0E0E0' : '#FFFFFF',
    alignSelf: isSent ? 'flex-end' : 'flex-start',
    wordBreak: 'break-word', 
    flexShrink: 0,  
    whiteSpace: 'pre-wrap',  
  };

  return (
    <Card style={cardStyle}>
      {msg?.text}
    </Card>
  );
};


MessageCard.propTypes = {
    msg: PropTypes.object,
  };
  
export default MessageCard;
