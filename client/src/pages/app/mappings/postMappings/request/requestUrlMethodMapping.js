import { useEffect, useState, useMemo } from "react";
import Dropdown from "wiremock/components/native/dropdown_single";
import RequestMapping from "./paramSelector";
import { useRecoilState } from "recoil";
import { stub } from "wiremock/recoil/atoms";

const methods = [
  { value: "get", label: "GET" },
  { value: "post", label: "POST" },
  { value: "put", label: "PUT" },
  { value: "patch", label: "PATCH" },
  { value: "delete", label: "DELETE" },
];

// URL Matcher options with corresponding keys
const urlMatchers = [
  { key: "url", label: "url" },
  { key: "urlPattern", label: "urlPattern" },
  { key: "urlPath", label: "urlPath" },
  { key: "urlPathPattern", label: "urlPathPattern" },
  { key: "urlPathTemplate", label: "urlPathTemplate" },
];

const RequestUrlMethodMapping = () => {
  const [reqStub, setReqStub] = useRecoilState(stub);

  const [urlValue, setUrlValue] = useState("");
  const [selectedMatcher, setSelectedMatcher] = useState("urlPath"); // Default

  // Extract initial matcher key and value
  useEffect(() => {
    const requestKeys = Object.keys(reqStub.request || {});
    const foundMatcher = urlMatchers.find((matcher) =>
      requestKeys.includes(matcher.key)
    );

    if (foundMatcher) {
      setSelectedMatcher(foundMatcher.key);
      setUrlValue(reqStub.request[foundMatcher.key]);
    }
  }, [reqStub.request]);

  useEffect(() => {
    if (!reqStub.request?.method) {
      setReqStub((prev) => ({
        ...prev,
        request: {
          ...prev.request,
          method: "GET",
        },
      }));
    }
  }, [reqStub.request?.method]);

  // Handle method dropdown change
  const onSelectMethod = (selectedOption) => {
    if (selectedOption.label !== reqStub.request?.method) {
      setReqStub((prev) => ({
        ...prev,
        request: {
          ...prev.request,
          method: selectedOption.label,
        },
      }));
    }
  };

  // Handle URL matcher dropdown change
  const onSelectMatcher = (selectedOption) => {
    const oldValue = reqStub.request?.[selectedMatcher] ?? "";

    setSelectedMatcher(selectedOption.key);
    setUrlValue(oldValue); // Retain old value

    // Update Recoil by removing old key and adding new key
    setReqStub((prev) => {
      const updatedRequest = { ...prev.request };
      delete updatedRequest[selectedMatcher];
      return {
        ...prev,
        request: {
          ...updatedRequest,
          [selectedOption.key]: oldValue,
        },
      };
    });
  };

  // Handle URL input change
  const onInputChange = (e) => {
    const newValue = e.target.value;
    setUrlValue(newValue);

    // Update Recoil by updating current selected matcher key
    setReqStub((prev) => ({
      ...prev,
      request: {
        ...Object.fromEntries(
          Object.entries(prev.request || {}).filter(
            ([key]) => !urlMatchers.some((m) => m.key === key)
          )
        ),
        [selectedMatcher]: newValue,
        method: prev.request?.method ?? "GET",
      },
    }));
  };


  // Dropdown options for method
  const methodOptions = useMemo(() => {
    const selectedMethod = reqStub.request?.method ?? "GET";
    return methods.map((method) => ({
      ...method,
      selected: method.label === selectedMethod,
    }));
  }, [reqStub.request?.method]);

  const urlMatcherOptions = useMemo(() => {
    return urlMatchers.map((matcher) => ({
      label: matcher.label,
      key: matcher.key,
      selected: matcher.key === selectedMatcher,
    }));
  }, [selectedMatcher]);

  return (
    <div
      id="request-specification"
      className="flex flex-col gap-2 p-5 border-2 border-solid border-sky-300"
    >
      <div id="Method" className="flex flex-row gap-3 w-full">
        <Dropdown
          options={methodOptions}
          setValue={onSelectMethod}
          width={"w-[140px]"}
          height={"h-[37px]"}
          className="mt-[3px]"
        />

        <Dropdown
          options={urlMatcherOptions}
          setValue={onSelectMatcher}
          width={"w-[180px]"}
          height={"h-[37px]"}
          className="mt-[3px]"
        />

        <input
          className="w-[500px] mt-[2px] px-2 py-[6px] 
            placeholder-blueGray-300 text-blueGray-600 
            relative bg-white rounded 
            border-slate-300 border-solid border
            shadow outline-none 
            focus:outline-none focus:shadow-outline 
            min-w-[15%] min-h-[5%] overflow-x-auto"
          type="text"
          value={urlValue}
          onChange={onInputChange}
          placeholder="Enter URL"
        />
      </div>
      <RequestMapping />
    </div>
  );
};

export default RequestUrlMethodMapping;
