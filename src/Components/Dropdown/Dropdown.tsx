import React, { useEffect, useRef } from "react";

function Dropdown(props: any) {
  const dropdownRef = useRef<any>();

  const handleClick = (event: any) => {
    if (dropdownRef && !dropdownRef?.current?.contains(event?.target)) {
      if (props.onClose) {
        props.onClose();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div
      ref={dropdownRef}
      className="dropdown"
      style={{
        position: "absolute",
        top: "100%",
        right: "0",
      }}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;
