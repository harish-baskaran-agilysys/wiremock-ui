import React, { useState } from "react";

const Switch = (props) => {
  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={props.onChange}
          checked={props.checked}
          disabled={props.disabled}
        />
        <div
          className="min-w-7 min-h-4 bg-gray-200 
        
        peer-focus:outline-none 
        peer-focus:ring-2 
        peer-focus:ring-blue-300 
        dark:peer-focus:ring-blue-800 
        rounded-full peer dark:bg-gray-700 
        peer-checked:after:translate-x-full
        peer-checked:after:border-blue-800 after:content-[''] 
        
        after:absolute after:top-[3px] 
        after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
        after:h-3.5 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-sky-600"

        ></div>
        <span className="ml-3 text-sm">{props.label}</span>
      </label>
    </div>
  );
};

export default Switch;
