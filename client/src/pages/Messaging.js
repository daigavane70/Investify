import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios';

const chats = [
  {
    id: 1,
    body: "Hello"
  },
  {
    id: 2,
    body: "Yo"
  }
]

const Chat = () => {
  // const [chats, setChats] = useState([]);  
  const url = "";
  const navigate = useNavigate();
  const onClick = (chat) => {
    navigate(`/messaging/${chat.sender}/${chat.receiver}`);
  }
  // useEffect(() => {
  //   axios.get(url).then(res => {
  //       setChats(res.data);
  //   })
  // }, [])  
  return (
    <div>
        {chats.map(chat => (
            <div key={chat.id} onClick={onClick}>
                <h3>{chat.body}</h3>
            </div>
        ))}
    </div>
  )
}

export default Chat