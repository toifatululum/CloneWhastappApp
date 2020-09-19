import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';

function Sidebar() {
  return (
    <div className="d-flex">
      <div className="sidebar">
        <div className="sidebar_header">
          <Avatar src="https://avatars1.githubusercontent.com/u/30462168?s=400&u=e0165ba32c06f85a31ac4a2310fb1133bdf03f5d&v=4" />
          <div className="sidebar_headerRight">
            <IconButton />
            <DonutLargeIcon />
            <IconButton />
            <IconButton />
            <ChatIcon />
            <IconButton />
            <IconButton />
            <MoreVertIcon />
            <IconButton />
          </div>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search or sart new chat" />
        </div>
      </div>

     
      <div className="sidebar_chats">
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />

      </div>
    </div>
  );
}
export default Sidebar;
