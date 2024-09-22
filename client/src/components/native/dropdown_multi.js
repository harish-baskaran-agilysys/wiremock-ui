import { Fragment, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import CheckBox from "./checkbox";

const DropdownMulti = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState([]);

  let width = props.width ? props.width : "w-[150px]";
  let height = props.height ? props.height : "h-[15px]";

  const dropdownRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const setSelected = (option) => {
    const updatedOptions = props.options.map((item) => {
      return {
        ...item,
        selected: item === option ? !item.selected : item.selected,
      };
    });
    props.setOptions(updatedOptions);
  };

  useEffect(() => {
    let array = [];
    setIsSelected(array);
    props.options.forEach((item) => {
      if (item.selected) array.push(item);
    });
    setIsSelected(array);
  }, [props.options]);

  return (
    <div
      ref={dropdownRef}
      className={`relative flex flex-col items-center rounded-lg ${
        isSelected.length > 0 ? `w-auto` : `${width}`
      } `}
    >
      <div
        ref={dropdownRef}
        onClick={() => setIsOpen(true)}
        className="flex border-gray-400 border-[1px] border-solid items-center justify-between w-full rounded-lg tracking-wider "
      >
        <button
          className={`bg-white-400  p-4 w-[75%]
        flex items-center justify-between text-sm
        ${isSelected.length > 0 ? `h-auto` : `${height}`} 
        `}
        >
          <div className="flex flex-wrap justify-between">
            {isSelected.length > 0 ? (
              isSelected.map((item, index) => {
                return (
                  <div
                    key={`${item}--${index}`}
                    className="flex justify-between bg-blue-200 py-1 px-2 border rounded-lg"
                  >
                    <div className=" font-normal text-[10px] ">
                      {item.label}
                    </div>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      onClick={() => setSelected(item)}
                      className="ml-[10px] w-[15px] h-[15px] my-auto cursor-pointer"
                    />
                  </div>
                );
              })
            ) : (
              <p>Select...</p>
            )}
          </div>
        </button>

        {isOpen ? (
          <FontAwesomeIcon
            icon={faChevronDown}
            className="mx-[10px] w-[15px] h-[15px] my-auto"
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronUp}
            className="mx-[10px] w-[15px] h-[15px] my-auto"
          />
        )}
      </div>
      {isOpen && (
        <div
          className="bg-white-400 border-[1px] border-gray-400 mt-[2px] z-1 
        flex flex-col items-start rounded-lg p-1 w-full"
        >
          <ul className="flex flex-col w-full">
            {props.options ? (
              props.options.map((item, i) => {
                return (
                  <li
                    key={`${item}-${i}`}
                    onClick={() => setSelected(item)}
                    className="flex hover:bg-gray-200 cursor-pointer
                    rounded-r-lg border-l-transparent"
                  >
                    <CheckBox
                      onChange={() => setSelected(item)}
                      checked={item.selected}
                      className="mr-[5px]"
                    />
                    <p>{item.label}</p>
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

export default DropdownMulti;
/*
props 
  width
  height
  options
*/
