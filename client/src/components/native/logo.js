import React from "react";
import Tooltip from "./tooltip";


// Component definition
const Logo = (props) => {
  return props.icon && props.message ? (
    <Tooltip message={props.message} position="down" className="cursor-pointer">
      <i
        className={`${props.icon} ${props.className}`}
        onClick={props.onClick}
      />
    </Tooltip>
  ) : (
    <i
      className={`${props.icon} ${props.className}`}
      onClick={props.onClick}
    />
  );
};

export default Logo;

/* 
  onClick=
  icon=
  className = 
*/
