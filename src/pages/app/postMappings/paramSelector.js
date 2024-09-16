import { useState } from "react";
import Button from "wiremock/components/native/button";
import QueryParamMapping from "./query";
import HeadersMapping from "./headers";
import BodyMapping from "./reqBody";

const RequestMapping = () => {
  const [selected, setSelected] = useState(1);

  const buttons = [
    { id: 1, label: "Query Params" },
    { id: 2, label: "Headers" },
    { id: 3, label: "Body" },
  ];

  const renderSelectedContent = () => {
    const contentMap = {
      1: <QueryParamMapping />,
      2: <HeadersMapping />,
      3: <BodyMapping />,
    };

    return contentMap[selected] || null;
  };

  return (
    <div id="request-specification" className="flex flex-col gap-2">
      <div id="req-selector" className="flex flex-row gap-3 p-5">
        {buttons.map((button) => (
          <Button
            key={button.id}
            label={button.label}
            onClick={() => setSelected(button.id)}
            type={selected === button.id ? "primary" : "primary_inverse"}
          />
        ))}
      </div>
      {renderSelectedContent()}
    </div>
  );
};

export default RequestMapping;
