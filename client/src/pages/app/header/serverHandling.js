import React, { useState, useEffect } from "react";
import { checkServer, runServer, stopServer } from "wiremock/axios";
import Button from "wiremock/components/native/button";
import Header from "wiremock/components/native/header";
import Input from "wiremock/components/native/input";
import PopupModal from "wiremock/components/native/popup1";
import { setWiremockUrl, getWiremockUrl } from "wiremock/utils/wiremockUrl";

function CreateServer() {
  const [port, setPort] = useState("");
  const [output, setOutput] = useState("");
  const [popupFlag, setPopupFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cloud, setCloud] = useState(getWiremockUrl);
  const [cloudHistory, setCloudHistory] = useState([]);

  // Set default values on initial mount
  useEffect(() => {
    setPort("5001");
    setOutput("Try an option");
  }, []);
  
  useEffect(() => {
    setWiremockUrl(cloud);
  }, [cloud]);
  
  useEffect(() => {
    if (popupFlag == false && cloud && cloud.trim()) {
      setCloudHistory((prev) => {
        const updated = [
          cloud.trim(),
          ...prev.filter((url) => url !== cloud.trim()),
        ];
        return updated.slice(0, 5); // keep only last 5 unique entries
      });
    }
  }, [popupFlag]);

  // Function to handle check/run/stop actions
  const handleAction = async (actionFn, label) => {
    if (!port || isNaN(Number(port))) {
      setOutput("⚠️ Please enter a valid port number.");
      return;
    }

    try {
      setLoading(true);
      const data = await actionFn({ port: Number(port) });
      setOutput(data.message || JSON.stringify(data));
    } catch (error) {
      setOutput(`❌ ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle modal open — reset state if needed
  const handleOpen = () => {
    setPopupFlag(true);
    setOutput("Try an option");
    setPort("5001");
  };

  const handleClose = () => {
    setPopupFlag(false);
    setOutput("");
  };

  return (
    <PopupModal
      logo={"fas fa-server"}
      logoClassName="pr-[20px]"
      logoLabel="Server Process"
      labelClassName="border border-sky-600 rounded py-1.5"
      flag={popupFlag}
      open={handleOpen}
      close={handleClose}
      height="h-[600px]"
      width="w-[35%]"
      header="Server Handling"
    >
      <div className="mt-[25px] flex flex-col gap-5 justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Header
              className="whitespace-nowrap"
              label="Cloud Server Connect"
            />
            <Input
              type="text"
              value={cloud}
              setValue={setCloud}
              placeholder="Enter server url"
              className="w-[500px]"
            />

            {cloudHistory.length > 0 && (
              <div className="ml-[10px] mt-1 mb-[50px] text-sm text-gray-600">
                <Header className="mb-1" label= "Recent servers connected:" />
                <div className="ml-[100px] flex flex-col gap-2 flex-wrap">
                  {cloudHistory.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => setCloud(url)}
                      className="text-blue-600 underline hover:text-blue-800 transition"
                    >
                      {url}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-b-2 border-sky-600 w-full"></div>

          <div className="flex gap-2">
            <Header className="whitespace-nowrap" label="Local Server Port :" />
            <Input
              type="text"
              value={port}
              setValue={setPort}
              placeholder="Enter port no"
              className="w-[100px]"
            />

            <Button
              onClick={() => handleAction(checkServer, "Check")}
              label="Check"
              disabled={loading}
            />
            <Button
              onClick={() => handleAction(runServer, "Run")}
              label="Run"
              disabled={loading}
            />
            <Button
              onClick={() => handleAction(stopServer, "Stop")}
              label="Stop"
              disabled={loading}
            />
          </div>

          <p className="text-sm mt-2 ml-[20px] whitespace-pre-wrap break-words text-gray-700">
            {output}
          </p>
        </div>
      </div>
    </PopupModal>
  );
}

export default CreateServer;
