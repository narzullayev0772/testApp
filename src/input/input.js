import "./input.css";
import { FcAdvertising, FcAddImage } from "react-icons/fc";
import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
const Input = ({ setNewMessage, room }) => {
  const [message, setMessages] = useState("");
  const ref = useRef(null);
  return (
    <div className="input">
      <div className="input__file">
        <Button>
          <FcAddImage size={"1.8rem"} fill="#fff" />
          <input
            type="file"
            accept="image/*"
            formEncType="multipart/form-data"
            className="input__file-manage"
          />
        </Button>
      </div>
      <div className="input__text">
        <textarea
          placeholder="Type here "
          rows="1"
          onChange={(e) => {
            var text = e.target.value;
            setMessages(text);
          }}
          ref={ref}
          autoFocus={true}
        ></textarea>
      </div>
      <div
        className="input__send"
        onClick={() => {
          if (message.trim() !== "") {
            let msg = {
              from: "user",
              room: room,
              text: message,
              time: Date.now(),
            };
            setNewMessage(msg);
            ref.current.value = "";
            setMessages("");
          }
        }}
      >
        <Button>
          <FcAdvertising size={"1.8rem"} fill="#fff" />
        </Button>
      </div>
    </div>
  );
};

export default Input;
