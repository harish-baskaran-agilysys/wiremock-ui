import { exportStateAsJSON } from "../hb_app/1_body/utils/exportStateAsJSON";
import { fontSize, typeColor } from "../configuration/config";

const styles = `rounded
px-3 py-1 my-[2px] mr-1 mb-1
ease-linear transition-all duration-150
`;

const Export = (props) => {
  let size = fontSize(props.size);
  let type = typeColor(props.type);

  const handleFileExport = () => {
    let data = props.onClick();
    data = props.stringify
      ? props.stringify === true
        ? JSON.stringify(data, null, 2)
        : data
      : data;

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

export default Export;
/*
props 
  size
  type
  className
  data
  stringify
  fileName
*/
