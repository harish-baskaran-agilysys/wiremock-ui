import { useState } from "react";
import Dropdown from "wiremock/components/native/dropdown_single";
import Header from "wiremock/components/native/header";
import Input from "wiremock/components/native/input";
import RequestMapping from "./paramSelector";

// Generalized LabeledInput component
const LabeledInput = ({ label, value, setValue, inputClassName }) => (
  <div className="flex flex-row justify-between">
    <Header label={label} />
    <Input className={inputClassName} value={value} setValue={setValue} />
  </div>
);

const ResponseMapping = () => {
  const [inputs, setInputs] = useState({
    status: "",
    statusMessage: "",
    fixedDelay: "",
    fault: "",
    dribbleChunks: "",
    totalDuration: "",
  });

  const handleInputChange = (field) => (value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const inputFields = [
    { label: "Status", value: inputs.status, setValue: handleInputChange("status"), className: "w-[135px]" },
    { label: "Status Message", value: inputs.statusMessage, setValue: handleInputChange("statusMessage"), className: "w-[250px]" },
    { label: "Fixed Delay", value: inputs.fixedDelay, setValue: handleInputChange("fixedDelay"), className: "w-[100px]" },
    { label: "Fault", value: inputs.fault, setValue: handleInputChange("fault"), className: "w-[320px]" },
    { label: "Chunks", value: inputs.dribbleChunks, setValue: handleInputChange("dribbleChunks"), className: "w-[130px]" },
    { label: "Total Duration", value: inputs.totalDuration, setValue: handleInputChange("totalDuration"), className: "w-[260px]" },
  ];

  return (
    <div id="request-specification" className="flex flex-col gap-2 p-5 border-2 border-solid border-sky-300">
      <div id="status" className="flex flex-row justify-between">
        {inputFields.slice(0, 2).map((field, index) => (
            <LabeledInput key={index} label={field.label} value={field.value} setValue={field.setValue} inputClassName={field.className} />
        ))}
      </div>
      
      <div id="delay" className="flex flex-row justify-between">
        {inputFields.slice(2, 4).map((field, index) => (
          <LabeledInput key={index} label={field.label} value={field.value} setValue={field.setValue} inputClassName={field.className} />
        ))}
      </div>

      <Header label="chunkedDribbleDelay:" />

      <div id="chunkedDribbleDelay" className="flex flex-row justify-between">
        {inputFields.slice(4).map((field, index) => (
          <LabeledInput key={index} label={field.label} value={field.value} setValue={field.setValue} inputClassName={field.className} />
        ))}
      </div>
    </div>
  );
};

export default ResponseMapping;
