import React, { useEffect, useRef, useState } from "react";
import Input from "./inputNoChange";

const TypeAhead = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState("" || props.value);

  const width = props.width ? props.width : "w-[200px]";

  const dropdownRef = useRef(null);

  // it will close the select when clicked outside.
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  function settingLabel() {
    props.options.forEach((item) => {
      if (item.selected) {
        setLabel(item.label);
        props.setValue ? props.setValue(item) : "";
      }
    });
  }

  useEffect(() => {
    // it will assign the default value and label from the options.

    settingLabel();

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const setSelected = (option) => {
    const updatedOptions = props.options.map((item) => {
      if (item === option) {
        setLabel(item.label);
        props.setValue ? props.setValue(item) : "";
      }
      return { ...item, selected: item === option };
    });
    props.setOptions ? props.setOptions(updatedOptions) : "";
    props.changedValues && props.onChange
      ? props.onChange(updatedOptions, props.changedValues)
      : props.onChange
      ? props.onChange(updatedOptions)
      : "";
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className={`w-[200px] ${props.className}`}>
      <Input
        placeholder="search"
        value={label}
        onChange={(event) => {
          setLabel(event.target.value);
          setIsOpen(true);
        }}
        className={`${width}`}
      />
      {isOpen && (
        <div
          className={`absolute opacity-100 bg-sky-400 border-[1px] border-gray-400 
          mt-[2px] z-30
          flex flex-col items-start rounded-lg ${width}`}
        >
          {label && (
            <ul id="myOptions" className="flex flex-col w-full">
              {props.options ? (
                props.options
                  .filter((item) => {
                    if (label.length === 0) {
                      return true; // Return all items without filtering
                    }
                    const labelChars = label.toLowerCase().split("");
                    const itemChars = item.label.toLowerCase().split("");
                    return labelChars.every((char) => itemChars.includes(char));
                  })
                  .map((item, i) => {
                    return (
                      <li
                        key={`${item}-${i}`}
                        onClick={() => setSelected(item)}
                        className="flex hover:bg-gray-200 hover:text-black cursor-pointer
                    rounded-lg border-l-transparent group"
                      >
                        <p className="text-white focus:text-black group-hover:text-black ml-[5px] w-full">
                          {item.label}
                        </p>
                      </li>
                    );
                  })
              ) : (
                <li key={`${item}-${i}`}>no options</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TypeAhead;
