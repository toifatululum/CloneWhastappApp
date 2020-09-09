import React from "react";
import "./Chat.css";
import { AttachFile, MoreVert } from "@material-ui/icons";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';

function Chat() {
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
        <p className="chat_message">
          <span className="chat_name">Toto</span>
          Halo, good mowning
          <span className="chat_timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat_message chat_reciever">
          <span className="chat_name">Toto</span>
          Halo, good mowning
          <span className="chat_timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>

      <div className="chat_footer">
        <EmojiEmotionsOutlinedIcon />
        <form>
          <input type="text" placeholder="Type a message" />
          <button type="submit">Send a message</button>
        </form>
        <MicOutlinedIcon />
      </div>
    </div>
  );
}

export default Chat;
