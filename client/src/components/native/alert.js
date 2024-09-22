import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "./tooltip";

export default function Alert(props) {
  const handleCloseClick = () => {
    props.setOutputFlag(false);
    props.setSuccessFlag(false);
  };

  return props.outputFlag ? (
    <div
      className={`flex justify-between mt-[3px] border-2 border-gray p-2 rounded-lg ${
        props.successFlag
          ? "text-green-700 bg-green-300 border-green-700"
          : "text-red-700 bg-red-300 border-red-700"
      } ${props.className}`}
    >
      <p>{props.message}</p>
      <Tooltip message={"Close"} position="top">
        <div
          className="ml-[10px] cursor-pointer"
          onClick={handleCloseClick}
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={`w-[15px] h-[15px]  ${
              props.successFlag ? "text-green" : "text-red"
            }`}
          />
        </div>
      </Tooltip>
    </div>
  ) : (
    <></>
  );
}
/* 
  outputFlag=
  setOutputFlag=
  successFlag=
  setSuccessFlag=
  message=
  className = 
*/
