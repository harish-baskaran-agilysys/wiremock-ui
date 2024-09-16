// src/AxiosGetComponent.js

import React, { useState } from "react";
import { deleteData, getData, persistData } from "wiremock/axios";
import Button from "wiremock/components/native/button";
import Logo from "wiremock/components/native/logo";
import TextArea from "wiremock/components/native/textarea";

const PersistAllMappings = () => {
  const [responseData, setResponseData] = useState("");

  const handleButtonClick = async () => {
    try {
      const data = await persistData();
      setResponseData(data);
      console.log(data);
    } catch (error) {
      setResponseData("Error: " + error.message);
    }
  };

  return (
    <div className="">
      <Button label={"Persist Mappings"} type="primary_inverse" onClick={handleButtonClick} />
    </div>
  );
};

export default PersistAllMappings;
