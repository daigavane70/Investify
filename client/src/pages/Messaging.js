import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Requests } from "../utils";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const onClick = (chat) => {
    navigate(`/messaging/${chat._id}/${chat.receiver}`);
  };
  useEffect(() => {
    Requests.getAllStartups().then((res) => setChats(res.data));
  }, []);
  return (
    <div className="space-y-2 max-h-full overflow-auto">
      <h1 className="text-xl font-bold pb-2 border-b text-gray-500">
        Messages ({chats.length})
      </h1>
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => onClick(chat)}
          className="p-4 bg-slate-50 rounded-lg shadow cursor-pointer hover:bg-blue-200 transition ease-in"
        >
          <h3>{chat.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Chat;
