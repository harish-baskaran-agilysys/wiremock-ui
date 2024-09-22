import React, { useState, useRef, useEffect, useCallback } from "react";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);

  useEffect(() => {
    minValRef.current = minVal;
    maxValRef.current = maxVal;
  }, [minVal, maxVal]);

  const handleMinChange = (event) => {
    const value = Math.min(+event.target.value, maxVal - 1);
    setMinVal(value);
    event.target.value = value.toString();
    onChange({ min: value, max: maxValRef.current });
  };

  const handleMaxChange = (event) => {
    const value = Math.max(+event.target.value, minVal + 1);
    setMaxVal(value);
    event.target.value = value.toString();
    onChange({ min: minValRef.current, max: value });
  };

  // Calculate the percentage of the slider range covered by min and max values
  const minPercentage = ((minVal - min) / (max - min)) * 100;
  const maxPercentage = ((maxVal - min) / (max - min)) * 100;

  return (
    <div className="bg-red-300 relative w-52 mb-5">
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={handleMaxChange}
        className="accent-sky-600 absolute top-0.5 w-52 z-30 h-0 appearance-none outline-none bg-transparent"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={handleMinChange}
        className={`accent-sky-600 absolute top-0.5 w-48 z-30 h-0 appearance-none outline-none bg-transparent`}
      />

      <div className="bg-gray-400 absolute z-1 w-full h-[5px] rounded-full" />
      <div
        className="bg-sky-600 absolute z-2 h-[5px]  rounded-full"
        style={{
          left: `${(minVal / max) * 100}%`,
          width: `${((maxVal - minVal) / max) * 100}%`,
        }}
      />
    </div>
  );
};

export default MultiRangeSlider;
