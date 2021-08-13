import React, { useState, useRef, useEffect } from "react";
import "./ChatSection.css";
import { IconButton, Avatar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoodIcon from "@material-ui/icons/Mood";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import SelectInput from "@material-ui/core/Select/SelectInput";
//import axios from "../axios";
import io from "socket.io-client";
import FormDialog from "./FormDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Picker from "emoji-picker-react";

function ChatSection(props) {
  const [roomId, setRoomId] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef();
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [emojiDialog, setEmojiDialog] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  useEffect(() => {
    getUser();
    setOpen(true);
    socketRef.current = io.connect();
    socketRef.current.on("room id", (id) => {
      setRoomId(id);
      console.log(id);
    });

    socketRef.current.on("message", (msg) => {
      receiveMsg(msg);
      console.log(msg, "mmmmmmmmmmmmmm");
    });
  }, []);

  function receiveMsg(msg) {
    setMessages((prevMsg) => [...prevMsg, msg]);
  }
  function sendMessage(e) {
    e.preventDefault();
    const messageObj = {
      body: message,
      date: new Date().toLocaleTimeString(),
      user: name,
      id: roomId,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObj);
  }

  const getUser = async () => {
    setLoading(true);
    let user = await localStorage.getItem("sender");
    if (user) {
      setName(user);
      setLoading(false);
    } else {
      setName();
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress />
      ) : !name ? (
        <FormDialog
          setName={setName}
          open={open}
          setOpen={setOpen}
        ></FormDialog>
      ) : (
        <div className="chat">
          <div className="chat_header">
            <Avatar />
            <div className="chat_header_info">
              <Typography
                style={{
                  color: "white",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  fontSize: 28,
                }}
              >
                {name}
              </Typography>
              <Typography style={{ color: "white" }}>
                {"Room-Id : " + roomId}
              </Typography>
            </div>
            <div className="chat_header_icon">
              <IconButton>
                <SearchIcon />
              </IconButton>
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <MoreVertIcon />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      localStorage.removeItem("sender");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </IconButton>
            </div>
          </div>
          <div className="chat_body">
            {messages?.map((message, index) => (
              <div
                style={{
                  backgroundColor: message.id === roomId ? "#c8e2e3" : "blue",
                  width: "max-content",
                  padding: "2px 18px",
                  borderRadius: "15px",
                  margin: "40px",
                  webkitBoxShadow: "1px 5px 8px -2px rgba(0,0,0,0.2)",
                  boxShadow: "1px 5px 8px -2px rgba(0,0,0,0.2)",
                  marginLeft: message.id === roomId ? "auto" : "0",
                }}
              >
                <Typography
                  key={index}
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    float: "right",
                    marginRight: "auto",
                    marginTop: "-20px",
                    fontStyle: "italic",
                    color: message.id === roomId ? "brown" : "green",
                  }}
                >
                  {message.user}
                </Typography>
                <Typography
                  key={index}
                  style={{
                    fontSize: "25px",
                    fontWeight: "400",
                    color: message.id === roomId ? "black" : "white",
                  }}
                >
                  {message.body}
                </Typography>
                <small
                  style={{
                    float: "right",
                    marginRight: "auto",
                    marginTop: "1px",
                  }}
                >
                  {message.date}
                </small>
              </div>
            ))}
          </div>

          {emojiDialog && <Picker onEmojiClick={onEmojiClick} />}

          <div className="chat_footer">
            <IconButton>
              <MoodIcon
                onClick={() =>
                  emojiDialog ? setEmojiDialog(false) : setEmojiDialog(true)
                }
              />
            </IconButton>

            <form className="chat_footer_input">
              <input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setEmojiDialog(false);
                }}
                type="text"
                placeholder="Type a message"
              />
              <button
                style={{ display: "none" }}
                onClick={sendMessage}
                type="submit"
              ></button>
            </form>

            {message && (
              <IconButton>
                <SendIcon onClick={sendMessage} className="chat_send_btn" />
              </IconButton>
            )}
            <IconButton>
              <MicIcon />
            </IconButton>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default ChatSection;
