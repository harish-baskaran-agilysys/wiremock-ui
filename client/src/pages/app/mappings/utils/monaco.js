import Editor from "@monaco-editor/react";

const JSONEditor = (props) => {
  const handleEditorChange = (text) => {
    props?.setValue(text);
  };

  const height = props?.height? props.height : "h-[42vh]" ; 

  return (
    <div className={`${height} w-[97%]`}>
      <Editor
        height="100%"
        defaultLanguage="json"
        value={props?.value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          linenumbers: "on",
          formatOnPaste: true,
          formatOnType: true,
          fontSize: 14,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default JSONEditor;
