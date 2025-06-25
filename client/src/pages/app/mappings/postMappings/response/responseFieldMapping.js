import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { stub } from "wiremock/recoil/atoms";
import JSONEditor, { detectLanguage } from "../../../utils/monaco";

const ResponseFieldMapping = ({ field, id }) => {
  const [reqStub, setReqStub] = useRecoilState(stub);
  const [inputText, setInputText] = useState("{}");

  const isUserEdit = useRef(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isUserEdit.current) {
      isUserEdit.current = false;
      return;
    }

    const body = reqStub.response?.[field];

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

      if (field === "body") {
        // For body, always store as a string
        if (lang === "json") {
          try {
            const parsed = JSON.parse(inputText);
            newFieldValue = JSON.stringify(parsed); // save as stringified JSON
          } catch {
            newFieldValue = inputText; // fallback
          }
        } else {
          newFieldValue = inputText; // XML or plaintext as-is
        }
      } else {
        // For headers, jsonBody, etc., store as an object if JSON, else as-is
        if (lang === "json") {
          try {
            newFieldValue = JSON.parse(inputText); // store as real object
          } catch {
            newFieldValue = inputText; // fallback
          }
        } else {
          newFieldValue = inputText;
        }
      }

      return {
        ...prev,
        response: {
          ...prev.response,
          [field]: newFieldValue,
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

export default ResponseFieldMapping;
