import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { stub } from "wiremock/recoil/atoms";
import JSONEditor, { detectLanguage } from "../../../utils/monaco";

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

    const body =
      reqStub.response?.transformerParameters?.http_request_maker?.[field];

    if (typeof body === "string") {
      const language = detectLanguage(body);
      if (language === "xml") {
        setInputText(body);
      } else {
        try {
          const parsed = JSON.parse(body);
          setInputText(JSON.stringify(parsed, null, 2));
        } catch (e) {
          setInputText(body); // fallback
        }
      }
    } else if (typeof body === "object") {
      setInputText(JSON.stringify(body, null, 2));
    } else {
      setInputText(body ?? "");
    }
  }, [reqStub, field]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }

    isUserEdit.current = true;
    const lang = detectLanguage(inputText);

    setReqStub((prev) => {
      let newFieldValue;

      if (lang === "json") {
        try {
          newFieldValue = JSON.parse(inputText);
        } catch {
          newFieldValue = inputText;
        }
      } else {
        newFieldValue = inputText;
      }

      return {
        ...prev,
        response: {
          ...prev.response,
          transformerParameters: {
            ...prev.response?.transformerParameters,
            http_request_maker: {
              ...prev.response?.transformerParameters?.http_request_maker,
              [field]: newFieldValue,
            },
          },
        },
      };
    });
  }, [inputText, field]);

  return (
    <div id={id} className="flex flex-col gap-2">
      <JSONEditor value={inputText} setValue={setInputText} />
    </div>
  );
};

export default TransformerFieldMapping;
