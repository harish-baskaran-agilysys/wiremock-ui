import { fontSize, typeColor } from "../configuration/config";

const styles = `
bg-[#f8f8f8] min-w-[25%] max-w-full min-h-[180px] p-[10px] 
border-[2px] border-solid border-grey text-[14px] 
outline-none focus:border-sky-600
`;

const TextArea = (props) => {
  let size = fontSize(props.size);
  let error = props.error ? "!border-red-500" : "";

  const handleType = (event) => {
    if (props.readOnly) return "";

    props.setValue(event.target.value);
  };

  const handlePaste = (event) => {
    if (props.readOnly) return "";

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

    // console.log(newValue);

    props.setValue(newValue);
    input.setSelectionRange(
      selectionStart + pastedText.length,
      selectionStart + pastedText.length
    );
  };

  return (
    <textarea
      className={`${styles} ${size} ${error} ${props.className}`}
      name={props.name}
      placeholder={props.placeholder}
      onClick={props.onClick}
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.onChange ? props.onChange : handleType}
      onPaste={handlePaste}
      readOnly={props.readOnly}
    />
  );
};

export default TextArea;
/*
  size=""
  className=""
  error={}
  name={}
  placeholder={}
  onClick={}
  defaultValue={}
  value={}
  setValue={}
  readOnly={}
*/
