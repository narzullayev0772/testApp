import "./avatar.css";
import React, {  } from "react";

const Avatar = ({ name, message, img,}) => {
  return (
    <div className="avatar">
      <div className="avatar__image">
        <div className="avatar__image-offline"></div>
        {img ? (
          <img src={img} alt="avatar" />
        ) : (
          <h1
            style={{
              fontSize: "1rem",
            }}
          >
            {name
              .split(" ")
              .map((e) => e[0].toUpperCase())
              .join("")}
          </h1>
        )}
      </div>
      <div className="avatar__info">
        <div className="avatar__info-name">{name}</div>
        <div className="avatar__info-text">{message}</div>
      </div>
      <div className="notification">
      </div>
    </div>
  );
};

export default Avatar;
