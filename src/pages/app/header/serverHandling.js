import React, { useState } from "react";
import { checkServer, runServer, stopServer } from "wiremock/axios";
import Alert from "wiremock/components/native/alert";
import Button from "wiremock/components/native/button";
import Input from "wiremock/components/native/input";
import PopupModal from "wiremock/components/native/popup1";

function CreateServer() {
  const [port, setPort] = useState("");
  const [output, setOutput] = useState("");

  const [popupFlag, setPopupFlag] = useState(false);

  const handleRunCommand = async () => {
    try {
      const data = await runServer({ port: port });
      setOutput(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCommand = async () => {
    try {
      const data = await stopServer({ port: port });
      setOutput(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckCommand = async () => {
    try {
      const data = await checkServer({ port: port });
      setOutput(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PopupModal
      logo={"fas fa-server"}
      logoClassName="pr-[20px]"
      logoLabel = "Server Process"
      labelClassName = "border border-sky-600 rounded py-1.5"
      // buttonLabel="Server Process"
      flag={popupFlag}
      open={() => setPopupFlag(true)}
      close={() => {
        setPopupFlag(false);
        setOutput("");
      }}
      height="h-[300px]"
      width="w-[30%]"
      header="Server Handling"
    >
      <div className="mt-[25px] flex flex-col gap-5 justify-between">
        <div className="flex gap-3">
          <p className="mt-[5px]">Server Port</p>

          <Input
            type="text"
            value={port}
            setValue={setPort}
            placeholder="Enter port no"
            className="w-[150px]"
          />
        </div>

        <div className="flex gap-3 justify-between">
          <Button onClick={() => handleCheckCommand()} label="Check Server" />
          <Button onClick={() => handleRunCommand()} label="Run Server" />
          <Button onClick={() => handleDeleteCommand()} label="Stop Server" />
        </div>
        <p>{JSON.stringify(output)}</p>
      </div>
    </PopupModal>
  );
}

export default CreateServer;
