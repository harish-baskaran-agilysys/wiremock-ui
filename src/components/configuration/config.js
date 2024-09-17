import React from "react";

export function fontSize(size) {
  let fontSize = size
    ? size.toLowerCase() === "extralarge"
      ? "text-xl"
      : size.toLowerCase() === "large"
      ? "text-lg"
      : size.toLowerCase() === "medium"
      ? "text-base"
      : "text-sm"
    : "text-sm";
  return fontSize;
}

export function typeColor(color) {
  let primary = `text-white hover:text-white !block 
    bg-sky-600 group-hover:bg-sky-400 group-active:bg-sky-600`;
  // border-blue-400 rounded-lg

  let primary_link = `text-sky-600 group-hover:text-sky !block 
    bg-white-400 group-hover:bg-white-600 group-active:bg-white-600`;

  let primary_inverse = `text-sky-600 hover:text-sky !block 
    bg-white-400  group-hover:bg-gray-300 active:bg-gray-300 
    border border-sky-600`;

  let secondary = `text-white hover:text-white !block 
    bg-sky-400 hover:bg-sky-600 active:bg-sky-600`;

  let info = `text-white hover:text-white !block 
    bg-blue-400 hover:bg-blue-600 active:bg-blue-600`;

  let success = `text-white hover:text-white !block 
    bg-green-400 hover:bg-green-600 active:bg-green-600`;

  let warning = `text-white hover:text-white !block 
    bg-yellow-400 hover:bg-yellow-600 active:bg-yellow-600`;

  let error = `text-white hover:text-white !block 
    bg-red-400 hover:bg-red-600 active:bg-red-600`;

  let typeColor = color
    ? color.toLowerCase() === "primary"
      ? primary
      : color.toLowerCase() === "primary_inverse"
      ? primary_inverse
      : color.toLowerCase() === "primary_link"
      ? primary_link
      : color.toLowerCase() === "secondary"
      ? secondary
      : color.toLowerCase() === "warning"
      ? warning
      : color.toLowerCase() === "error"
      ? error
      : color.toLowerCase() === "success"
      ? success
      : color.toLowerCase() === "info"
      ? info
      : primary
    : primary;
  return typeColor;
}

const Configuration = () => {};

export default Configuration;
