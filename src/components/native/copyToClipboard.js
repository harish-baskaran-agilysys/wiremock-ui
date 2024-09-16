import { exportStateAsJSON } from "../hb_app/1_body/utils/exportStateAsJSON";
import { fontSize, typeColor } from "../configuration/config";

const styles = `
border rounded outline-none 
px-3 py-1 my-[2px] mr-1 mb-1
focus:outline-none  
ease-linear transition-all duration-150
`;

const Copy = (props) => {
  let size = fontSize(props.size);
  let type = typeColor(props.type);

  const handleFileExport = () => {
    const data = props.stringify
      ? props.stringify === true
        ? JSON.stringify(props.data, null, 2)
        : props.data
      : props.data;

    exportStateAsJSON(data, props.fileName);
  };

  return (
    <div>
      <label className={`${styles} ${size} ${type} ${props.className}`}>
        <button
          onClick={() => handleFileExport()}
          style={{ display: "none" }}
        />
        Export
      </label>
    </div>
  );
};

export default Copy;
/*
props 
  size
  type
  className
  data
  stringify
  fileName
*/
