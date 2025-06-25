import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { pd } from 'pretty-data';
import Button from "wiremock/components/native/button";
import PopupModal from "wiremock/components/native/popup1";

export const detectLanguage = (value) => {
  if (!value) return "plaintext";
  if (typeof value !== "string") return "json"; // if value is object, assume json
  const trimmed = value.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
  if (trimmed.startsWith("<")) return "xml";
  return "plaintext";
};

const LanguageSelector = ({ language, setLanguage }) => (
  <div className="flex gap-2">
    <label className="text-sky-600 text-sm mt-2">Select Language:</label>
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="border rounded px-2"
    >
      <option value="plaintext">Plain Text</option>
      <option value="json">JSON</option>
      <option value="xml">XML</option>
    </select>
  </div>
);

const MonacoEditor = ({ language, value, onChange,  height = "97%" }) => (
  <Editor
    height={height}
    language={language}
    value={value}
    onChange={onChange}
    theme="vs-dark"
    options={{
      minimap: { enabled: false },
      lineNumbers: "on",
      formatOnPaste: true,
      formatOnType: true,
      fontSize: 14,
      scrollBeyondLastLine: false,
    }}
  />
);

const JSONEditor = (props) => {
  const [language, setLanguage] = useState("plaintext");
  const [editorValue, setEditorValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const { beautifyToggle = true } = props;

  useEffect(() => {
    let val = props?.value;
    let lang = detectLanguage(val);

    if (typeof val !== "string") {
      try {
        val = JSON.stringify(val || {}, null, 2);
      } catch (e) {
        val = "";
      }
    }
    setLanguage(lang);
    setEditorValue(val);
  }, [props?.value]);

  const handleEditorChange = (text) => {
    setEditorValue(text);
    props.setValue(text);
  };

  const beautifyContent = () => {
    try {
      let pretty = editorValue;
      if (language === "json") {
        pretty = pd.json(editorValue);
      } else if (language === "xml") {
        pretty = pd.xml(editorValue);
      } else {
        return alert("Beautify not supported for this type.");
      }
      setEditorValue(pretty);
      props.setValue(pretty);
    } catch (e) {
      alert("Invalid content: " + e.message);
    }
  };

  return (
    <div className={`${props.height ? props.height : 'h-[45vh]'} w-[97%] flex flex-col gap-2`}>
      <div className="flex gap-2 justify-between">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <div className="flex gap-2">
          <PopupModal
            buttonType="primary_link"
            buttonLabel="Expand Editor"
            flag={isExpanded}
            open={() => setIsExpanded(true)}
            close={() => setIsExpanded(false)}
            height="h-[90vh]"
            width="w-[80vw]"
            header="Editor Handling"
          >
            <div className="flex flex-col gap-2 w-[75vw] h-[75vh]">
              <div className="flex justify-between">
                <LanguageSelector language={language} setLanguage={setLanguage} />
                { beautifyToggle && <Button onClick={() =>beautifyContent()} type="primary_link" label="Beautify" /> } 
              </div>
              <MonacoEditor
                language={language}
                value={editorValue}
                onChange={handleEditorChange}
                height="100%"
              />
            </div>
          </PopupModal>
          { beautifyToggle && <Button onClick={() =>beautifyContent()} type="primary_link" label="Beautify" /> } 
        </div>
      </div>
      <MonacoEditor
        language={language}
        value={editorValue}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default JSONEditor;