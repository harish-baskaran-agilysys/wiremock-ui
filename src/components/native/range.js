import React, { useEffect, useState } from "react";
import Tooltip from "./tooltip";

const Range = (props) => {
  const [rangeValue, setRangeValue] = useState(props.value ? props.value : 10);

  const handleRangeChange = (event) => {
    const value = event.target.value;
    setRangeValue(value);
    if (props.setValue) {
      props.setValue(value);
    }
  };

  const handleRangeBlur = () => {
    if (props.setValue) {
      props.setValue(rangeValue);
    }
  };

  useEffect(() => {
    const rangeInput = document.getElementById("rangeInput");
    rangeInput.style.background = `linear-gradient(to right, #0284C7 0%, #0284C7 ${rangeValue}%, #d1d5db ${rangeValue}%, #d1d5db 100%)`;
  }, [rangeValue]);

  return (
    <Tooltip message={rangeValue} position="up">
      <input
        id="rangeInput"
        type="range"
        value={rangeValue}
        onChange={handleRangeChange}
        onBlur={handleRangeBlur}
        className={`my-[15px] ${
          props.className ? props.className : "w-full"
        } h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-sky-600`}
        style={{
          background: `linear-gradient(to right, #1E90FF 0%, #1E90FF ${rangeValue}%, #d1d5db ${rangeValue}%, #d1d5db 100%)`,
        }}
      />
    </Tooltip>
  );
};

export default Range;
