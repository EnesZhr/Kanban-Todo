import React from "react";
import { X } from "react-feather";

import "./Chips.css";

function Chips(props: any) {
  return (
    <div className="chip" style={{ backgroundColor: props.color }}>
      {props.text}

      {props.close && (
        <X onClick={() => (props.close ? props.onClose() : "")} />
      )}
    </div>
  );
}

export default Chips;
