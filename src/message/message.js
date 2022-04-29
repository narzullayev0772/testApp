import { Typography } from "@mui/material";
import moment from "moment";
import { MdDone, MdDoneAll, MdTimer } from "react-icons/md";
import "./message.css";

const Message = ({ status, message__text, message__time, isOwn }) => {
  return (
    <div
      className="message__wrapper"
      style={isOwn ? { justifyContent: "flex-end" } : {}}
    >
      <div
        className="message"
        style={
          isOwn
            ? { background: "#00f", color: "#fff", borderBottomRightRadius: 0 }
            : { borderBottomLeftRadius: 0 }
        }
      >
        <div >
          <Typography
            variant="body2"
            component={"p"}
            gutterBottom
            letterSpacing={0.5}
            className="message__text"
          >
            {message__text}
          </Typography>
        </div>
        <div className="message__time">
          <Typography variant="body2" component={"p"} fontSize={"10px"} mr={1}>
            {moment(message__time).format("h:m")}
          </Typography>
          <div className="message__status">
            {status ? (
              status.seen ? (
                <MdDoneAll size={"14px"} />
              ) : (
                <MdDone size={"14px"} />
              )
            ) : (
              <MdTimer size={"14px"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
