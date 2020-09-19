import React, {useState} from "react";
import "./Chat.css";
import { AttachFile, MoreVert } from "@material-ui/icons";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import axios from './axios';

function Chat({ messages }) {
  const [input, setInput] =  useState("");
  const sendMessage = async (e) =>  {
    e.preventDefault();

    await axios.post("/messages/new", {
      message:input,
      name : "Demo App",
      timestamp: "just now", 
      recieved:false,
    });


    setInput("");
  }
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>Room name</h3>
          <p>Last seen</p>
        </div>

        <div className="chat_headerRight">
          <IconButton />
          <SearchOutlinedIcon />
          <IconButton />
          <IconButton />
          <AttachFile />
          <IconButton />
          <IconButton />
          <MoreVert />
          <IconButton />
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.recieved ? "": "chat_reciever"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
        <span className="chat_timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <EmojiEmotionsOutlinedIcon />
        <form>
          <input value={input} onChange={e =>  setInput(e.target.value)} type="text" placeholder="Type a message" />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicOutlinedIcon />
      </div>
    </div>
  );
}

export default Chat;