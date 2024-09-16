import React, { useState } from "react";
import Button from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";

const PopupModal = (props) => {
  const { flag, open, save, close, height, width, header, children } = props;
  return (
    <div>
      {flag ? (
        <div className="fixed z-10 inset-0 overflow-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className={`inline-block align-bottom bg-white rounded-lg text-left 
              overflow-hidden shadow-xl transform transition-all 
              flex flex-col justify-between 
              ${height ? height : "h-[300px]"} ${width ? width : ""}`}
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {header}
                      </h3>
                      <div className="mt-2">{children}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button
                    label="Save & Close"
                    size="small"
                    type="primary"
                    className="h-[33px] !py-0 !mt-[3px]"
                    onClick={close}
                  />
                  <Button
                    label="Save"
                    size="small"
                    type="primary"
                    className="h-[33px] !py-0 !mt-[3px]"
                    onClick={save}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FontAwesomeIcon
          icon={faUpRightAndDownLeftFromCenter}
          className={`text-sky-600 ml-[10px] mt-[5px] w-[15px] h-[15px] cursor-pointer`}
          onClick={open}
        />
      )}
    </div>
  );
};

export default PopupModal;
