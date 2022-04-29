import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { MdKeyboardArrowLeft, MdPhoto, MdSend } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AvatarList from "../components/list";
import Message from "../message/message";
import "./chat.css";
const Chat = ({ socket }) => {
  const { username } = useParams();
  const status = "online";
  const href = "https://picsum.photos/200/300";

  const [message, setMessage] = useState({
    text: "",
    time: Date.now(),
    isOwn: true,
    chat_id: username,
  });
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on("message", (msg) => {
        setMessages([...messages, msg]);
      });
    }

    // scroll to bottom

    ref.current.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }, [socket, messages]);

  return (
    <div className="chat">
      <div className="chat__left"></div>
      <div className="chat__main">
        <div className="chat__main__header">
          <Button>
            <MdKeyboardArrowLeft size={"2rem"} color="#000" />
          </Button>
          <Link
            to={`/user/${username}`}
            style={{
              width: "100%",
            }}
          >
            <AvatarList
              username={username}
              status={status}
              href={href}
              isNav={true}
            />
            <Divider />
          </Link>
        </div>
        <div className="chat__main__body" ref={ref}>
          {messages ? (
            messages.length > 0 ? (
              messages.map((message, index) => (
                <Message
                  message__text={message.text}
                  message__time={message.time}
                  isOwn={message.isOwn}
                  key={index}
                  status={message.status}
                />
              ))
            ) : (
              <Typography
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                No messages
              </Typography>
            )
          ) : (
            <CircularProgress
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          )}
        </div>
        {message && (
          <div className="chat__main__footer">
            <Button
              sx={{
                position: "relative",
              }}
            >
              <input
                type="file"
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: "0",
                  position: "absolute",
                }}
                //   only accept image
                accept="image/*"
              />
              <MdPhoto size={"2rem"} color="#00f" />
            </Button>
            <TextField
              fullWidth
              id="standard-textarea"
              placeholder="Xabar yuborish ... "
              variant="standard"
              onChange={(e) => {
                const newMessage = { text: e.target.value };
                setMessage({ ...message, ...newMessage });
              }}
              value={message.text}
            />
            <Button
              onClick={() => {
                setMessage({ ...message, time: Date.now() });
                socket.emit("message", message);
                setMessage({
                  time: Date.now(),
                  text: "",
                  isOwn: true,
                  chat_id: username,
                });
              }}
            >
              <MdSend size={"2rem"} color="#00f" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
