import React from "react";

import "./Modals.css";

function Modals(props: any) {
  return (
    <div
      className="modal"
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <div
        className="modal_content custom-scroll"
        onClick={(event: any) => event.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Modals;
