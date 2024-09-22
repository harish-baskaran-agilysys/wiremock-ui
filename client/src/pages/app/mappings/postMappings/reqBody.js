import { useState } from "react";
import Button from "wiremock/components/native/button";
import TextArea from "wiremock/components/native/textarea";

const BodyMapping = () => {
  const [responseData, setResponseData] = useState("");
  return (
    <div id="body-req-specification" className="flex flex-col gap-2">
      <Button icon="fas fa-save" className={"p-0"} />
      <TextArea value={responseData} setValue={setResponseData} className="h-max" />
    </div>
  );
};

export default BodyMapping;
