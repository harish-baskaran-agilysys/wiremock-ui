// src/AxiosGetComponent.js

import React, { useState } from "react";
import { deleteData, getData } from "wiremock/axios";
import Button from "wiremock/components/native/button";
import Logo from "wiremock/components/native/logo";
import TextArea from "wiremock/components/native/textarea";
import PersistAllMappings from "../persistMappings";

const GetAllMappings = () => {
  const [responseData, setResponseData] = useState("");

  const handleButtonClick = async () => {
    try {
      const data = await getData();
      setResponseData(data);
    } catch (error) {
      setResponseData("Error: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
    } catch (error) {
      setResponseData("Error: " + error.message);
    }
    await handleButtonClick();
  };

  return (
    <div className="m-[10px] p-[10px] flex flex-col h-full">
      <div className="flex gap-1">
      <Button label={"Fetch Mappings"} onClick={handleButtonClick} />
      <PersistAllMappings />
      </div>
      <br />
      {responseData?.mappings?.map((mapping) => (
        <div className="flex justify-between">
          <p className="truncate" key={mapping.id}>
            {mapping.name}
          </p>
          <Logo
            onClick={() => handleDelete(mapping.id)}
            icon="fas fa-trash"
            className="cursor-pointer text-sky-600 mt-1 hover:bg-gray-300"
          />
        </div>
      ))}
    </div>
  );
};

export default GetAllMappings;
