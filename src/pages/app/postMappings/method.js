import { useEffect, useState } from "react";
import Dropdown from "wiremock/components/native/dropdown_single";
import Header from "wiremock/components/native/header";
import Input from "wiremock/components/native/input";
import RequestMapping from "./paramSelector";
import { useRecoilState } from "recoil";
import { stub } from "wiremock/recoil/atoms";

const MethodMapping = () => {
  const [reqStub, setReqStub] = useRecoilState(stub);

  const methods = [
    { value: "get", label: "GET", selected: true },
    { value: "post", label: "POST", selected: false },
    { value: "put", label: "PUT", selected: false },
    { value: "patch", label: "PATCH", selected: false },
    { value: "delete", label: "DELETE", selected: false },
  ];
  const [selected, setSelected] = useState("");
  const [options, setOptions] = useState(methods);

  const [value, setValue] = useState("");

  useEffect(() => {
   
    const updatedReqStub = {
      ...reqStub,
      request: {
        ...reqStub.request,
        method: selected.label,
      },
    };
  
    setReqStub(updatedReqStub);
  }, [selected]);

  useEffect(() => {
   
    const updatedReqStub = {
      ...reqStub,
      request: {
        ...reqStub.request,
        urlPath: value,
      },
    };
  
    setReqStub(updatedReqStub);
  }, [value]);

  return (
    <div
      id="request-specification"
      className="flex flex-col gap-2 p-5 border-2 border-solid border-sky-300"
    >
      <div id="Method" className="flex flex-row gap-3  w-full">
        <Dropdown
          options={options}
          setOptions={setOptions}
          setValue={setSelected}
          width={"w-[140px]"}
          height={"h-[37px]"}
          className="mt-[3px]"
        />
        <Input className={"w-[500px]"} value={value} setValue={setValue} />
      </div>
      <RequestMapping />
    </div>
  );
};

export default MethodMapping;
