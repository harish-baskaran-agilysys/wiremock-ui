import { fontSize, typeColor } from "../configuration/config";

const CheckBox = (props) => {
  return (
    <input
      type="checkbox"
      checked={props.checked}
      className={`accent-sky-600 ${props.className}`}
      onChange={props.onChange}
      onClick={props.onClick}
      disabled={props.disabled}
    />
  );
};

export default CheckBox;
