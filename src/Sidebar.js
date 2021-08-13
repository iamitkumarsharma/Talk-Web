import React from "react";
import "./Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function Sidebar() {
  function SidebarChat() {
    return (
      <div className="sidebarchat">
        <Avatar src="" />
        <div className="sidebarchat_info">
          <strong>Room Name</strong>
          <p>Last Message</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="header_left">
          <Avatar />
        </div>
        <div className="header_right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search_container">
        <div className="sidebar_search">
          <SearchIcon />
          <input placeholder="search" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
