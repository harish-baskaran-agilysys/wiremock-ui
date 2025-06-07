import { useEffect, useState, useMemo } from "react";
import Dropdown from "wiremock/components/native/dropdown_single";
import Header from "wiremock/components/native/header";
import ResponseTabs from "./paramSelector";
import { useRecoilState } from "recoil";
import { stub } from "wiremock/recoil/atoms";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => ({
  value: m.toLowerCase(),
  label: m,
}));

const TransformerMapping = () => {
  const [reqStub, setReqStub] = useRecoilState(stub);

  const httpMaker = reqStub.response?.transformerParameters?.http_request_maker || {};

  const [state, setState] = useState({
    method: httpMaker.method ?? "",
    delay: httpMaker.delay ?? "",
    url: httpMaker.url ?? "",
  });

  const [transformerInput, setTransformerInput] = useState(
    (reqStub.response?.transformers ?? []).join(", ")
  );

  // Sync from Recoil only when reqStub changes externally
  useEffect(() => {
    const updatedHttp = reqStub.response?.transformerParameters?.http_request_maker || {};
    setState({
      method: updatedHttp.method ?? "",
      delay: updatedHttp.delay ?? "",
      url: updatedHttp.url ?? "",
    });

    setTransformerInput((reqStub.response?.transformers ?? []).join(", "));
  }, [reqStub]);

  const updateStub = (key, value) => {
    if (key === "transformers") {
      setReqStub((prev) => ({
        ...prev,
        response: {
          ...prev.response,
          transformers: value,
        },
      }));
    } else {
      setReqStub((prev) => ({
        ...prev,
        response: {
          ...prev.response,
          transformerParameters: {
            http_request_maker: {
              ...prev.response?.transformerParameters?.http_request_maker,
              [key]: value,
            },
          },
        },
      }));
    }
  };

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    if (key === "transformers") {
      setTransformerInput(value); // Don't update Recoil yet
    } else {
      setState((prev) => ({ ...prev, [key]: value }));
      updateStub(key, value);
    }
  };

  const handleTransformerBlur = () => {
    const arr = transformerInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    updateStub("transformers", arr);
  };

  const handleMethodSelect = (option) => {
    setState((prev) => ({ ...prev, method: option.label }));
    updateStub("method", option.label);
  };

  const dropdownOptions = useMemo(
    () =>
      methods.map((m) => ({
        ...m,
        selected: m.label === state.method,
      })),
    [state.method]
  );

  return (
    <div className="flex flex-col gap-2 p-5 border-2 border-sky-300">
      <div className="flex flex-row gap-3 w-full">
        <Header label="Transformer" />
        <input
          className={styles}
          type="text"
          value={transformerInput}
          onChange={handleChange("transformers")}
          onBlur={handleTransformerBlur}
          placeholder="Enter Transformer Name"
        />
      </div>

      <div className="flex flex-row gap-3">
        <Header label="Async Method" />
        <Dropdown
          options={dropdownOptions}
          setValue={handleMethodSelect}
          width="w-[140px]"
          height="h-[37px]"
          className="mt-[3px]"
        />
        <Header label="Async Delay" />
        <input
          className={styles}
          type="text"
          value={state.delay}
          onChange={handleChange("delay")}
          placeholder="Async Delay"
        />
      </div>

      <div className="flex flex-row gap-3 w-full">
        <Header label="Async URL" />
        <input
          className={styles}
          type="text"
          value={state.url}
          onChange={handleChange("url")}
          placeholder="Enter Async URL Path"
        />
      </div>

      <ResponseTabs />
    </div>
  );
};

const styles = `
  w-full placeholder-blueGray-300 text-blueGray-600 
  bg-white rounded border-slate-300 border shadow outline-none 
  focus:shadow-outline min-w-[15%] min-h-[5%] 
  overflow-x-auto px-2 py-[6px] mt-[2px]
`;

export default TransformerMapping;
