import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [message, setMessage] = useState('');
  const sendMessage = async () => {
    if(message){
        const messageData = {
            senderName,
            receiverName,
            message,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        }
        await WebSocket.emit("", messageData);
    }
  }
  useEffect(() => {
    axios.get("*/:sender").then(res => {
        setSenderName(res.name);
    })
    axios.get("*/:receiver").then(res => {
        setReceiverName(res.name);
    })
  }, [])
  const {sender, receiver} = useParams();
  return (
    <div>
        <div>
            {/* Header */}
        </div>
        <div>
            {/* Body */}
        </div>
        <div>
            {/* Footer */}
            <input value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat