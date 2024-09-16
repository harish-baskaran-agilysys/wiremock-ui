import { fontSize, typeColor } from "../configuration/config";

const Radio = (props) => {
  return (
    <input
      type="radio"
      checked={props.checked}
      className={`accent-sky-600 ${props.className}`}
      onChange={props.onChange}
      onClick={props.onClick}
      disabled={props.disabled}
    />
  );
};

export default Radio;
