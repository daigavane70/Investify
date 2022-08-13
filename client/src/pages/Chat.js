import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Input } from "antd";

const Chat = () => {
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([
    {
      sender: 123,
      receiver: 123,
      message: "How you doin?",
      receipts: 0,
    },
  ]);
  const sendMessage = async () => {
    if (message) {
      const messageData = {
        senderName,
        receiverName,
        message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await WebSocket.emit("", messageData);
    }
  };
  useEffect(() => {
    axios.get("*/:sender").then((res) => {
      setSenderName(res.name);
    });
    axios.get("*/:receiver").then((res) => {
      setReceiverName(res.name);
    });
  }, []);
  const { sender, receiver } = useParams();
  return (
    <>
      <div>
        {messageList.map((msg) => {
          return (
            <div className="">
              <div>msg</div>
            </div>
          );
        })}
      </div>
      <div className="flex space-x-2">
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button onClick={sendMessage} type="primary" className="text-blue-400">
          &#9658;
        </Button>
      </div>
    </>
  );
};

export default Chat;
