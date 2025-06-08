import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { stub } from "wiremock/recoil/atoms";
import JSONEditor from "../../../utils/monaco";

const TransformerFieldMapping = ({ field, id }) => {
  const [reqStub, setReqStub] = useRecoilState(stub);
  const [inputText, setInputText] = useState("{}");

  const isUserEdit = useRef(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isUserEdit.current) {
      isUserEdit.current = false;
      return;
    }

    try {
      const body =
        reqStub.response?.transformerParameters?.http_request_maker?.[field];
      const parsed = typeof body === "string" ? JSON.parse(body) : body;
      setInputText(JSON.stringify(parsed || {}, null, 2));
    } catch (e) {
      setInputText("{}");
    }
  }, [reqStub, field]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }

    try {
      const parsed =
        typeof inputText === "string" ? JSON.parse(inputText) : inputText;

      isUserEdit.current = true;

      setReqStub((prev) => ({
        ...prev,
        response: {
          ...prev.response,
          transformerParameters: {
            ...prev.response?.transformerParameters,
            http_request_maker: {
              ...prev.response?.transformerParameters?.http_request_maker,
              [field]: parsed,
            },
          },
        },
      }));
    } catch (e) {}
  }, [inputText, field]);

  return (
    <div id={id} className="flex flex-col gap-2">
      <JSONEditor value={inputText} setValue={setInputText} />
    </div>
  );
};

export default TransformerFieldMapping;
