import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./profit.css";
export const Profit = (props) => {
  const { value } = props;

  if (value >= 0) {
    return (
      <div className="maincontainer">
        <h1>Profit/Loss : </h1>
        <div className="profit">{value}</div>
        <FontAwesomeIcon
          icon={faArrowUp}
          beatFade
          style={{ color: "#48ed0c", height: 50 }}
        />
      </div>
    );
  } else {
    return (
      <div className="maincontainer">
        <h1>Profit/Loss : </h1>
        <div className="loss">{value}</div>

        <FontAwesomeIcon
          icon={faArrowDown}
          beatFade
          style={{ color: "#ed0c39", height: 50 }}
        />
      </div>
    );
  }
};
