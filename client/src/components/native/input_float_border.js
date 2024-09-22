import React, { useState } from "react";

const InputComponent = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

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
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        className={`border rounded-lg p-1 outline-none border-sky-600`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onPaste={handlePaste}
        value={props.value}
      />
      <label
        htmlFor={props.id}
        className={`absolute left-2 text-gray-400 pointer-events-none transform transition-all duration-150 ease-in-out ${
          isFocused || (props.value && props.value !== "")
            ? "translate-y-[-50%] scale-75 bg-white text-sky-600 rounded px-2"
            : "translate-y-1 pl-1"
        }`}
      >
        {props.label}
      </label>
    </div>
  );
};

export default InputComponent;
