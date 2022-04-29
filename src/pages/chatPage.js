import ChatHeader from "../chatHeader/chatHeader";
import ChatMain from "../chatMain/chatMain";
import Content from "../content/content";
import "../app.css";
import { useState, useEffect, useRef } from "react";
import { Badge, Typography } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";

const Chatpage = ({ socket, user }) => {
  const [count, setCount] = useState(4);
  const ref = useRef(null);

  const toDown = () => {
    let scrollTo = ref.current.scrollHeight;
    ref.current.scrollTo(0, scrollTo);
    setCount(null);
  };

  useEffect(() => {
    // when ref scroll down to the bottom count--
    ref.current.addEventListener("scroll", (e) => {
      let y = e.target.scrollTop;
      let k = Math.round(y / 440);
      if (Number.isInteger(k)) {
        setCount(count - k);
      }
    });
  }, []);
  return (
    <>
      <ChatHeader user={user} />
      <div className="App">
        <div className="App__chat">
          <ChatMain socket={socket} />
        </div>
        <div className="App__side" ref={ref}>
          <Typography
            variant="h4"
            textAlign={"center"}
            bgcolor="#efefefe50"
            position={"sticky"}
            top={0}
            zIndex={10}
            padding="10px"
            style={{
              backdropFilter: "blur(10px)",
              fontWeight: "bold",
            }}
            color="#123"
            border={"1px solid #ccc"}
          >
            Takliflar
          </Typography>
          {/* takliflar */}
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          {/* takliflar */}
          <Badge
            badgeContent={count}
            color="secondary"
            style={{
              background: "#123",
              borderRadius: "50%",
              position: "fixed",
              bottom: "1.5%",
              right: "1.5%",
            }}
          >
            <MdKeyboardArrowDown fontSize={"2rem"} onClick={toDown} />
          </Badge>
        </div>
      </div>
    </>
  );
};

export default Chatpage;
