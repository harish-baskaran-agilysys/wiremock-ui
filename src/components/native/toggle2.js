import { fontSize, typeColor } from "../configuration/config";

const containerStyles = `
flex justify-around min-w-[15%] p-1 mb-2 border-2 rounded-full border-sky-600 bg-gray-200
`;

const innerStyles = `
px-[10px] text-[14px]
`;

const selectedStyles = `
bg-white border-sky-600 text-sky-600 border-2 rounded-full
`;

const Toggle2 = (props) => {
  return (
    <div className={`${containerStyles} ${props.className}`}>
      <button
        className={`${innerStyles}
                    ${props.flag ? selectedStyles : ""}`}
        onClick={() => props.setFlag(true)}
      >
        {props.left}
      </button>
      <button
        className={`${innerStyles}
                    ${!props.flag ? selectedStyles : ""}`}
        onClick={() => props.setFlag(false)}
      >
        {props.right}
      </button>
    </div>
  );
};

export default Toggle2;
/*
props 
    className
    flag
    onClick
    left
    right
*/
