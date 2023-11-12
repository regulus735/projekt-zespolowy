import React from "react";

import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>
      <img
        src="../../../photos/logo.png"
        className="logo"
        alt="logo.png"
        style={{ width: "100%", height: "100%" }}
      />
      {props.children}
    </div>
  );
};

export default Card;
