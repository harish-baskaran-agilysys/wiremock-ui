import { fontSize, typeColor } from "../configuration/config";

const styles = `
mt-[2px] px-2 py-[6px] 
placeholder-blueGray-300 text-blueGray-600 
relative bg-white bg-white rounded 
border-slate-300 border-solid border
shadow outline-none 
focus:outline-none focus:shadow-outline min-w-[25%] min-h-[5%]
overflow-x-auto
`;

const Input = (props) => {
  let size = fontSize(props.size);

  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className={`${styles} ${size} ${props.className}`}
      onChange={props.onChange}
      onPaste={props.onPaste}
      value={props.value}
    />
  );
};

export default Input;
/* 
    props : 
      size
      placeholder
      className
      onChange
      onPaste
      value
    */
