import React, { useEffect, useState } from "react";
import { getData } from "wiremock/axios";
import Button from "wiremock/components/native/button";

const GetAllMappings = (props) => {
  const handleButtonClick = async () => {
    try {
      const data = await getData();
      props.setResponseData(data);
    } catch (error) {
      props.setResponseData("Error: " + error.message);
    }
  };

  useEffect(() => {
    if (props.loadAgain === true) {
      handleButtonClick();
      props.setloadAgain(false);
    }
  }, [props.loadAgain]);

  return (
    <Button
      label={"Fetch"}
      type="primary_inverse"
      onClick={handleButtonClick}
    />
  );
};

export default GetAllMappings;
