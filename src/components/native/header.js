import { fontSize, typeColor } from "../configuration/config";

const styles = `
mt-[10px] px-2 
text-sky-600 font-bold
min-w-[25%] min-h-[5%]
`;

const Header = (props) => {
  let size = fontSize(props.size);
  return (
    <h3
      className={`${styles} ${size} ${props.className}`}
      onClick={props.onClick}
    >
      {props.label}
    </h3>
  );
};

export default Header;
/*
props
  size
  className
  label
*/
