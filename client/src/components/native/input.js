import { fontSize, typeColor } from "../configuration/config";

const styles = `
mt-[2px] px-2 py-[6px] 
placeholder-blueGray-300 text-blueGray-600 
relative bg-white bg-white rounded 
border-slate-300 border-solid border
shadow outline-none 
focus:outline-none focus:shadow-outline min-w-[15%] min-h-[5%]
overflow-x-auto
`;

const Input = (props) => {
  let size = fontSize(props.size);

  const handleChange = (event) => {
    props.onChange ? props.onChange : "";
    props.setValue ? props.setValue(event.target.value) : "";
  };

  const handlePaste = (event) => {
    props.onPaste ? props.onPaste() : "";
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    const input = event.target;
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;
    const currentValue = props.value || "";
    const newValue =
      currentValue.slice(0, selectionStart) +
      pastedText +
      currentValue.slice(selectionEnd);
    props.setValue(newValue);
    input.setSelectionRange(
      selectionStart + pastedText.length,
      selectionStart + pastedText.length
    );
  };

  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className={`${styles} ${size} ${props.className}`}
      onChange={handleChange}
      onPaste={handlePaste}
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
      setValue
    */
