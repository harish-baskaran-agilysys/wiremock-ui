import { fontSize, typeColor } from "../configuration/config";
import React, { useRef } from "react";

const styles = `
rounded
px-3 py-1 my-[2px] mr-1 mb-1
ease-linear transition-all duration-150
`;

const Import = (props) => {
  let size = fontSize(props.size);
  let type = typeColor(props.type);

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
    <div>
      <label className={`${styles} ${size} ${type} ${props.className}`}>
        <input
          type="file"
          ref={fileInput}
          onChange={(e) => handleFileInputChange(e)}
          style={{ display: "none" }}
        />
        Import
      </label>
    </div>
  );
};

export default Import;
/* 
    props : 
      size
      type
      className
      setData
      onClick
    */
