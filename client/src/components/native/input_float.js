import React, { useState } from "react";
import Logo from "./logo";

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);

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
    <div className={`relative mt-2`}>
      <div className="flex">
        <input
          type="text"
          id={props.id}
          placeholder={props.placeholder}
          className="w-full outline-none hover:cursor-text"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          onPaste={handlePaste}
          value={props.value}
        />

        <label
          htmlFor={props.id}
          className={`absolute left-0 -top-1 w-full text-gray-400 
            transition-all ease-in-out 
            hover:cursor-text flex gap-1
            ${
              isFocused || (props.value && props.value !== "")
                ? "-top-4 text-sm text-sky-600 -translate-x-5 scale-75"
                : ""
            }`}
        >
          {props.floatIcon && (
            <Logo icon={props.floatIcon} className={`pt-1 `} />
          )}

          {props.label}
        </label>
        {props.staticIcon && (
          <Logo
            icon={props.staticIcon}
            className={` pt-1 
            ${
              isFocused || (props.value && props.value !== "")
                ? "text-sky-600"
                : "text-gray-400"
            }`}
          />
        )}
      </div>

      <div
        className={`absolute bottom-0 left-0 h-0.5 w-full 
            ${
              isFocused || (props.value && props.value !== "")
                ? " bg-sky-600 "
                : " bg-gray-400 "
            }`}
      ></div>
    </div>
  );
};

export default Input;
