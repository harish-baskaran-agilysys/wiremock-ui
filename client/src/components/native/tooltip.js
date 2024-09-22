import { fontSize, typeColor } from "../configuration/config";

const position = `-top-6`;
const styles = `absolute 
rounded bg-gray-800 scale-0 transition-all 
p-2 text-xs text-white group-hover:scale-100`;

export default function Tooltip(props) {
  return (
    <div className="group relative flex z-4">
      {props.children}
      <span
        className={`${styles} ${
          props.position == "left"
            ? "-left-8"
            : props.position == "lessRight"
            ? "left-5 right-20"
            : props.position == "right"
            ? "right-10"
            : props.position == "down"
            ? "-bottom-6"
            : position
        } ${fontSize(props.size)} ${props.className}`}
      >
        {props.message}
      </span>
    </div>
  );
}
