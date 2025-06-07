import { useState } from "react";
import NameMapping from "./name";
import RequestUrlMethodMapping from "../request/requestUrlMethodMapping";
import ResponseMapping from "../response/response";
import TransformerMapping from "../transformer/transformers";
import Button from "wiremock/components/native/button";
import MetadataMapping from "../metadata";

const Builder = () => {

    const [request, setRequest] = useState(false);
    const [response, setResponse] = useState(false);
    const [transformers, setTransformers] = useState(false);
    const [metadata, setMetadata] = useState(true);


  return (
    <div id="builder-specification" className="flex flex-col">
     <NameMapping />

        <Button
          label="Request"
          className="rounded-full w-[110px] my-3 !pl-0"
          end_icon={request ? "fas fa-caret-down" : "fas fa-caret-up"}
          onClick={() => setRequest(!request)}
        />
        {request && <RequestUrlMethodMapping />}

        <Button
          label="Response"
          className="rounded-full w-[110px] my-3 !pl-0"
          end_icon={response ? "fas fa-caret-down" : "fas fa-caret-up"}
          onClick={() => setResponse(!response)}
        />
        {response && <ResponseMapping />}

        <Button
          label="Transformers"
          className="rounded-full w-[110px] my-3 !pl-0"
          end_icon={transformers ? "fas fa-caret-down" : "fas fa-caret-up"}
          onClick={() => setTransformers(!transformers)}
        />
        {transformers && <TransformerMapping />}

        <Button
          label="Metadata"
          className="rounded-full w-[110px] my-3 !pl-0"
          end_icon={metadata ? "fas fa-caret-down" : "fas fa-caret-up"}
          onClick={() => setMetadata(!metadata)}
        />
        {metadata && <MetadataMapping />}
    </div>
  );
};

export default Builder;
