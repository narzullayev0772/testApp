import ChatHeader from "../chatHeader/chatHeader";
import ImgMediaCard from "../components/card";
import { useState, useEffect } from "react";

const Seller = ({ socket, user }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (socket) {
      socket.on("seller", (data) => {
        // add array to the data
        setData((prev) => [...prev, data]);
      });
    }
  }, [socket]);
  return (
    <div className="seller">
      <ChatHeader user={user} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2%",
          marginBottom: "2%",
        }}
      >
        {data.reverse().map((item, index) => (
          <ImgMediaCard
            key={index}
            type={item.type}
            cost={item.cost}
            message={item.message}
            image={item.image}
            from={user?.data.username}
            message_id={item.message_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Seller;
