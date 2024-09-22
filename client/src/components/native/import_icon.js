import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faDownload } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "./tooltip";

const ImportIcon = (props) => {
  const fileInput = useRef(null);

  const handleFileInputChange = (event) => {
    props.onClick ? props.onClick() : "";
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const data = JSON.parse(fileReader.result);
      props.setData(JSON.stringify(data, 2, null));
    };
    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <Tooltip message="Import" position="left">
      <label>
        <input
          type="file"
          ref={fileInput}
          onChange={(e) => handleFileInputChange(e)}
          style={{ display: "none" }}
        />
        <FontAwesomeIcon
          icon={faDownload}
          className={`text-sky-600 cursor-pointer ${props.className}`}
        />
      </label>
    </Tooltip>
  );
};

export default ImportIcon;
/*
props 
  className
  onClick
  setData
*/
