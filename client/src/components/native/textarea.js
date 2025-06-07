import { fontSize, typeColor } from "../configuration/config";

const styles = `
bg-[#f8f8f8] min-w-[25%] max-w-full min-h-[180px] p-[10px] 
border-[2px] border-solid border-grey text-[14px] 
outline-none focus:border-sky-600
`;

const TextArea = (props) => {
  let size = fontSize(props.size);
  let error = props.error ? "!border-red-500" : "";
  let change = props.change ? props.change : true;

  const handleType = (event) => {
    if (props.readOnly) return "";
    props.setValue(event.target.value);
  };

  const handlePaste = (event) => {
    if (props.readOnly) return "";
    event.preventDefault();

    const pastedText = event.clipboardData.getData("text");
    const input = event.target;
    const { selectionStart, selectionEnd } = input;
    const newValue =
      (props.value || "").slice(0, selectionStart) +
      pastedText +
      (props.value || "").slice(selectionEnd);

    props.setValue(newValue);
    input.setSelectionRange(
      selectionStart + pastedText.length,
      selectionStart + pastedText.length
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();

      const input = event.target;
      const { selectionStart, selectionEnd } = input;
      const value = props.value || "";
      const newValue =
        value.substring(0, selectionStart) +
        "\t" +
        value.substring(selectionEnd);

      props.setValue(newValue);

      // Move cursor after the tab character
      setTimeout(() => {
        input.setSelectionRange(
          selectionStart + 1,
          selectionStart + 1
        );
      }, 0);
    }
  };

  return (
    <textarea
      className={`${styles} ${size} ${error} ${props.className}`}
      name={props.name}
      placeholder={props.placeholder}
      onClick={props.onClick}
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={change && props.onChange ? props.onChange : handleType}
      onBlur={props.onBlur ? props.onBlur : handleType}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
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
