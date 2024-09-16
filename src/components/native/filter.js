import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faFilterCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import CheckBox from "./checkbox";

const Filter = (props) => {
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
    setIsSelected([]);
  }, [props.options]);

  return (
    <div
      ref={dropdownRef}
      className={`relative flex flex-col items-center rounded-lg ${width} `}
    >
      <div
        ref={dropdownRef}
        onClick={() => setIsOpen(true)}
        className="flex  items-center justify-between w-full rounded-lg tracking-wider "
      >
        <button
          className={`bg-white-400  p-4 w-[75%]
        flex items-center justify-between font-bold text-sm
        ${height} 
        `}
        >
          {isOpen ? (
            <FontAwesomeIcon
              icon={faFilterCircleXmark}
              className="w-[25px] h-[25px] m-auto text-cyan-500"
            />
          ) : (
            <FontAwesomeIcon
              icon={faFilter}
              className="w-[25px] h-[25px] m-auto text-cyan-500"
            />
          )}
        </button>
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

export default Filter;
/*
props 
  width
  height
  options
*/
