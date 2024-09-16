export default function FloatingFilled(props) {
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
    <div className="relative">
      <input
        type="text"
        id="floating_filled"
        className={`block rounded-t-lg px-2  pt-4 ${props.className} text-sm text-gray-900 bg-gray-50 
        dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
        dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer`}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onPaste={props.onPaste}
        value={props.value}
      />
      <label
        className="absolute text-[12px] text-gray-500 dark:text-gray-400 duration-300 transform 
        -translate-y-4 scale-75 top-3 z-5 origin-[0] left-2.5 
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 
        peer-hover:scale-75 peer-hover:-translate-y-4 peer-hover:text-sky-600 peer-hover:dark:text-sky-500 
        "
      >
        {props.label}
      </label>
    </div>
  );
}
/*
props 
  label
  className
  value 
  setValue 
*/
