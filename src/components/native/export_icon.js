import { exportStateAsJSON } from "../hb_app/1_body/utils/exportStateAsJSON";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faArrowUpFromBracket,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "./tooltip";

const ExportIcon = (props) => {
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
    <Tooltip message="Export" position="left" className="cursor-pointer">
      <FontAwesomeIcon
        icon={faUpload}
        className={`text-sky-600 cursor-pointer ${props.className}`}
        onClick={() => handleFileExport()}
      />
    </Tooltip>
  );
};

export default ExportIcon;
/*
props 
  className
  stringify
  fileName
*/
