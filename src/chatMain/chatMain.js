import "./chatMain.css";
import Input from "../input/input";
import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { FcBusinessman } from "react-icons/fc";
import BuyerContent from "../buyerContent/buyercontent";
import Modal from "../uploadForm/uploadform";

const ChatMain = ({ socket }) => {
  const ref = useRef();

  const [content, setContent] = useState([]);

  useEffect(() => {
    let scrollTo = ref.current.scrollHeight;
    ref.current.scrollTo(0, scrollTo);
  }, []);
  return (
    <div className="chat__main">
      <div className="chat__main-side">
        <Typography
          variant="h4"
          textAlign={"center"}
          bgcolor="#e8e8e860"
          position={"sticky"}
          top={0}
          zIndex={10}
          padding="10px"
          style={{
            backdropFilter: "blur(10px)",
            fontWeight: "bold",
            display: "flex",
            flexDirection: "row",
            alignitems: "center",
          }}
          color="#123"
          border={"1px solid #ccc"}
        >
          <Modal socket={socket} setContent={setContent} />
          Talab
        </Typography>

        {content.map((e, i) => (
          <BuyerContent
            key={i}
            type={e.type}
            cost={e.cost}
            image={e.image}
            comment={e.message}
            time={e.time}
          />
        ))}
      </div>
      <div className="chat__main-chat" ref={ref}>
        <Input />
        {/* {messages.length > 0 && room ? (
          messages.map((msg, index) => {
            return (
              msg && (
                <Message
                  key={index}
                  from={msg.from}
                  room={room}
                  img={"assets/avatar.jpg"}
                  text={msg.text}
                  userId={msg.userId}
                  socket={socketIO}
                />
              )
            );
          })
        ) : ( */}
        <div
          className="chat__main-message"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FcBusinessman fontSize={"4rem"} />
          <h3>Sotuvchini tanlang</h3>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default ChatMain;
