import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Input } from "antd";
import io from "socket.io-client";

const Socket = io.connect("http://localhost:4000");

const Chat = () => {
  const { sender, receiver } = useParams();

  const [senderName, setSenderName] = useState(sender);
  const [receiverName, setReceiverName] = useState(receiver);
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
    if (message !== "") {
      const messageData = {
        sender: senderName,
        receiver: receiverName,
        message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await Socket.emit("send_message", messageData);
      // setMessageList([...messageList, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    Socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    // axios.get("*/:sender").then((res) => {
    //   setSenderName(res.name);
    // });
    // axios.get("*/:receiver").then((res) => {
    //   setReceiverName(res.name);
    // });
  }, [Socket]);
  return (
    <div className="h-full w-full relative">
      <div className=" absolute left-0 bottom-0 align-baseline w-full">
        <div>
          {messageList.map((msg) => {
            return (
              <div
                className={`mb-2 flex ${
                  msg.sender === sender && " justify-end"
                }`}
              >
                <div className="p-2 bg-blue-200 px-4 rounded-full">
                  {msg.message}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex space-x-2 ">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-full"
            onPressEnter={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={sendMessage}
            type="primary"
            className="text-blue-400 rounded-full"
          >
            &#9658;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
