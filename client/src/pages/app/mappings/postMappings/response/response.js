import { useEffect, useState, useMemo } from "react";
import Dropdown from "wiremock/components/native/dropdown_single";
import Header from "wiremock/components/native/header";
import ResponseTabs from "./paramSelector";
import { useRecoilState } from "recoil";
import { stub } from "wiremock/recoil/atoms";

const faults = [
  { value: "NONE", label: "No fault" },
  { value: "EMPTY_RESPONSE", label: "Close socket with no response" },
  {
    value: "RANDOM_DATA_THEN_CLOSE",
    label: "Send bad HTTP data then close socket",
  },
  {
    value: "MALFORMED_RESPONSE_CHUNK",
    label: "Send 200 response then bad HTTP data, then close socket",
  },
  { value: "CONNECTION_RESET_BY_PEER", label: "Peer connection reset" },
];

const delay = [
  { value: "NONE", label: "No delay" },
  { value: "fixedDelayMilliseconds", label: "Fixed delay" },
];

const ResponseMapping = () => {
  const [reqStub, setReqStub] = useRecoilState(stub);

  const httpMaker = reqStub.response || {};

  const [state, setState] = useState({
    status: httpMaker.status ?? "",
    statusMessage: httpMaker.statusMessage ?? "",
    fixedDelayMilliseconds: httpMaker.fixedDelayMilliseconds ?? "",
  });

  // Sync from Recoil only when reqStub changes externally
  useEffect(() => {
    const updatedHttp = reqStub.response || {};
    setState({
      status: updatedHttp.status ?? "",
      statusMessage: updatedHttp.statusMessage ?? "",
      fixedDelayMilliseconds: updatedHttp.fixedDelayMilliseconds ?? "",
    });
  }, [reqStub]);

  useEffect(() => {
    if (!reqStub.response?.fault) {
      setReqStub((prev) => ({
        ...prev,
        response: {
          ...prev.response,
          fault: "NONE",
        },
      }));
    }
  }, [reqStub.response?.fault]);

  useEffect(() => {
    if (!reqStub.response?.delay) {
      setReqStub((prev) => ({
        ...prev,
        response: {
          ...prev.response,
          delay: "NONE",
        },
      }));
    }
  }, [reqStub.response?.delay]);

  const updateStub = (key, value) => {
    setReqStub((prev) => ({
      ...prev,
      response: {
        ...prev.response,
        [key]: value,
      },
    }));
  };

  const handleChange = (key) => (e) => {
    let value = e.target.value;

    // Convert fixedDelayMilliseconds to integer, others keep as string
    if (key === "fixedDelayMilliseconds" || key === "status") {
      // Parse int, fallback to 0 if invalid
      value = parseInt(value, 10);
      if (isNaN(value)) value = 0;
    }

    setState((prev) => ({ ...prev, [key]: value }));
    updateStub(key, value);
  };

  // Handle method dropdown change
  const onSelectFault = (selectedOption) => {
    if (selectedOption.label !== reqStub.response?.fault) {
      setReqStub((prev) => ({
        ...prev,
        response: {
          ...prev.response,
          fault: selectedOption.label,
        },
      }));
    }
  };

  // Dropdown options for method
  const faultOptions = useMemo(() => {
    const selectedMethod = reqStub.response?.fault ?? "No fault";
    return faults.map((method) => ({
      ...method,
      selected: method.label === selectedMethod,
    }));
  }, [reqStub.response?.fault]);

  const onSelectDelay = (selectedOption) => {
    if (selectedOption.label !== reqStub.response?.delay) {
      setReqStub((prev) => ({
        ...prev,
        response: {
          ...prev.response,
          delay: selectedOption.label,
        },
      }));
    }
  };

  // Dropdown options for method
  const delayOptions = useMemo(() => {
    const selectedMethod = reqStub.response?.delay ?? "No delay";
    return delay.map((method) => ({
      ...method,
      selected: method.label === selectedMethod,
    }));
  }, [reqStub.response?.delay]);

  return (
    <div className="flex flex-col gap-2 p-5 border-2 border-sky-300">
      <div className="flex flex-row gap-3 w-full">
        <Header label="Status Code" />
        <input
          className={`${styles} !w-[30%]`}
          type="number"
          value={state.status}
          onChange={handleChange("status")}
          placeholder="Enter status"
        />

        <Header label="Status Message" className="w-[200px]" />
        <input
          className={styles}
          type="text"
          value={state.statusMessage}
          onChange={handleChange("statusMessage")}
          placeholder="Enter Status Message"
        />
      </div>

      <div className="flex flex-row gap-3">
        <Header label="Response Fault" className="w-[125px]" />
        <Dropdown
          options={faultOptions}
          setValue={onSelectFault}
          width="w-[80%]"
          height="h-[37px]"
          className="mt-[3px]"
        />
      </div>

      <div className="flex flex-row gap-3">
        <Header label="Response Delay" className="w-[170px]" />
        <Dropdown
          options={delayOptions}
          setValue={onSelectDelay}
          width="w-[200px]"
          height="h-[37px]"
          className="mt-[3px]"
        />
        {reqStub.response?.delay == "Fixed delay" ? (
          <div className="flex flex-row gap-3 w-full">
            <Header label="Fixed delay" className="pt-1" />
            <input
              className={`${styles} !w-[30%]`}
              type="number"
              value={state.fixedDelayMilliseconds}
              onChange={handleChange("fixedDelayMilliseconds")}
              placeholder="Enter fixedDelayMilliseconds"
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <ResponseTabs />
    </div>
  );
};

const styles = `
  w-full placeholder-blueGray-300 text-blueGray-600 
  bg-white rounded border-slate-300 border shadow outline-none 
  focus:shadow-outline min-w-[15%] min-h-[3%] 
  overflow-x-auto px-2 py-[3px] mt-[2px]
`;

export default ResponseMapping;
