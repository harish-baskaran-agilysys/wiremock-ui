import { forwardRef } from "react";
import { fontSize, typeColor } from "../configuration/config";
import Logo from "./logo";

const styles = `
py-2 mr-1 rounded
ease-linear transition-all duration-150 flex gap-2 justify-between align-center 
`;

const Button = forwardRef((props, ref)  => {
  let size = fontSize(props.size);
  let type = typeColor(props.type);

  return (
    <div className="group">
      <button
        type="button"
        className={`${styles} ${size} ${type} ${props.className} ${props.label ? "" : "rounded-full"} ${props.end_icon ? "pl-3" : "px-3"}`}
        onClick={props.onClick}
        disabled={props.disabled}
        ref={ref}
      >
        {props.icon && (
          <Logo
            icon={props.icon}
            className={`${props.label ? "mr-2 " : ""} ${type == "primary_inverse" ? "text-sky-400 " : ""}`}
          />
        )}
        {props.label && props.label}

        {props.end_icon && (
          <Logo
            icon={props.end_icon}
            className={`${props.label ? "ml-4 " : ""} ${type == "primary_inverse" ? "text-sky-400 " : ""} `}
          />
        )}
      </button>
    </div>
  );
});

Button.displayName = "Button";
export default Button;
/* 
    props : 
      size
      type
      className
      label
      onClick
      icon
    */
