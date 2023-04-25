import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp,faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import "./profit.css";
export const Profit = (props) => {
  const { value } = props;

  if (value >= 0) {
    return (
      <div className="maincontainer">
        <h3 style={{textAlign:'left'}}>Gross Profit/Loss</h3>
        {/* <FontAwesomeIcon icon={faMoneyBillTrendUp} bounce style={{color: "#42f202",}} /><hr/> */}
        <div className="profit">{value}</div>
        <FontAwesomeIcon
          icon={faArrowUp}
          beatFade
          style={{ color: "#48ed0c", height: 30 }}
        />
      </div>
    );
  } else {
    return (
      <div className="maincontainer">
         <h3 style={{textAlign:'left',paddingBottom:'28px'}}>Gross Profit/Loss </h3><hr/>
        <div className="loss1">
        <div className="loss">{value}</div>
        <div>
        <FontAwesomeIcon
          icon={faArrowDown}
          beatFade
          style={{ color: "#ed0c39", height: 30,paddingTop:'10px',paddingLeft:'5px' }}
        />
        </div>
        </div>
      </div>
    );
  }
};