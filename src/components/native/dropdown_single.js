import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CheckBox from "./checkbox";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState("Select...");

  let width = props.width ? props.width : "w-[150px]";
  let height = props.height ? props.height : "h-[15px]";
  let text = props.text ? props.text : "text-sm";

  const dropdownRef = useRef(null);
  let clickEvent = null;

  // it will close the select when clicked outside.
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  function settingLabel() {
    props.options.forEach ((item) => {
      if (item.selected) {
        setLabel(item.label);
        props.setValue ? props.setValue(item) : "";
      }
    });
  }

  function setTableHeight() {
    clickEvent?.preventDefault();

    const container = document.getElementById("myContainer");
    const table = document.getElementById("myTable");
    const options = document.getElementById("myOptions");

    const tableHeight = table?.offsetHeight;
    const contentHeight = table?.scrollHeight;
    const optionsHeight = options?.offsetHeight;

    if (container && table) {
      if (contentHeight > tableHeight) {
        container.style.height = contentHeight + optionsHeight + "px";
      } else {
        container.style.height = "auto";
      }
      container.scrollTo({
        top: clickEvent?.target.offsetTop,
        behavior: "smooth",
      });
    }
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

  useEffect(() => {
    settingLabel();
  }, [props.options]);

  useEffect(() => {
    setTableHeight();
    clickEvent = null;
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`relative flex flex-col items-center rounded-lg ${width} ${props.className}`}
    >
      <button
        onClick={(e) => {
          clickEvent = e;
          setIsOpen(!isOpen);
        }}
        className={`
        ${
          props.color === true
            ? label === "Select..."
              ? "border-gray-400 active:border-white"
              : "border-sky-600 active:border-sky-400 text-sky-600 bg-sky-600 text-white"
            : "border-gray-400 active:border-white"
        }
        bg-white-400 
        rounded-lg border-[1px] border-solid 
        py-4 px-2 w-full active:text-white 
        flex items-center justify-between 
        tracking-wider duration-300 
        ${height} ${text}`}
      >
        {label}

        {isOpen ? (
          <FontAwesomeIcon icon={faChevronDown} className="w-[15px] h-[15px]" />
        ) : (
          <FontAwesomeIcon icon={faChevronUp} className="w-[15px] h-[15px]" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute opacity-100 bg-sky-400 border-[1px] border-gray-400 mt-[2px] z-30
        flex flex-col items-start rounded-lg p-1 w-full"
        >
          <ul id="myOptions" className="flex flex-col w-full">
            {props.options ? (
              props.options.map((item, i) => {
                return (
                  <li
                    key={`${item}-${i}`}
                    onClick={() => setSelected(item)}
                    className="flex hover:bg-gray-200 hover:text-black cursor-pointer
                    rounded-lg border-l-transparent group"
                  >
                    <CheckBox
                      onChange={() => setSelected(item)}
                      checked={item.selected}
                      className="mx-[5px] hover:text-black"
                    />
                    <p className="text-white focus:text-black group-hover:text-black w-full">
                      {item.label}
                    </p>
                  </li>
                );
              })
            ) : (
              <li key={`${item}-${i}`}>no options</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
/*
props 
  width
  height
  className
  options
  setOptions
*/
