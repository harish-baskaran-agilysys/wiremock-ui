import React, { useState } from "react";
import Logo from "wiremock/components/native/logo";

import DeleteMappings from "./deleteMappings";

const Mappings = (props) => {
  const { mapping, selected, onSelect, setloadAgain } = props;

  return (
    <div
      className={`flex gap-2 rounded-lg border border-solid px-[10px] py-[10px] mb-[10px]
        min-w-full cursor-pointer ${selected ? "border-sky-400" : "border-gray-300"}`}
      onClick={onSelect}
    >
      <p className={`border-2 border-solid ${selected ? "border-sky-400" : "border-gray-300"}`}></p>
      <div className="flex-1 flex-col justify-between gap-2" id="">
        <div className="flex justify-between ">
          <p className="truncate font-bold" key={mapping.id}>
            {mapping.name}
          </p>
          <Logo
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this mapping?")) 
                { 
                    DeleteMappings(mapping.id);
                    setloadAgain(true);
                }
            }}
            icon="fas fa-trash"
            className="cursor-pointer text-red-400 mt-1"
          />
        </div>
        <div className="flex gap-2">
          <p className="text-sky-600 font-bold">{mapping.request.method}</p>
          <p>{mapping.request.urlPath}</p>
        </div>
        <div className="text-sky-600">
          <p>{mapping.response.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Mappings;
