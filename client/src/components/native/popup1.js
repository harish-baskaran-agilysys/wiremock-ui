import React, { useState } from "react";
import Button from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import Logo from "./logo";

const PopupModal = (props) => {
  const {
    flag,
    open,
    save,
    close,
    height,
    width,
    contentWidth,
    outerStyles,
    containerStyles,
    header,
    children,
    saveLabel,
    logo,
    logoLabel,
    labelClassName,
    logoClassName,
    buttonLabel,
    buttonType,
  } = props;
  return (
    <div>
      {flag ? (
        <div className={`fixed z-10 inset-0 overflow-auto ${outerStyles}`}>
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div
              className={`fixed inset-0 flex items-center justify-center z-50 `}
            >
              <div
                className={`inline-block align-bottom bg-white rounded-lg text-left 
              overflow-hidden shadow-xl transform transition-all 
              flex flex-col justify-between
              ${height ? height : ""} ${width ? width : ""}`}
              >
                <div
                  className={`${containerStyles} px-4 pt-5 pb-4 sm:p-6 sm:pb-4 `}
                >
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {header}
                      </h3>
                      <div className={`mt-2 ${contentWidth}`}>{children}</div>
                    </div>
                  </div>
                </div>
                {close ? (
                  save ? (
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      {close && (
                        <Button
                          label="Close"
                          size="small"
                          type="primary"
                          className="h-[33px] !py-0 !mt-[3px]"
                          onClick={close}
                        />
                      )}
                      {save && (
                        <Button
                          label={saveLabel ? saveLabel : "Save"}
                          size="small"
                          type="primary"
                          className="h-[33px] !py-0 !mt-[3px]"
                          onClick={save}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      {close && (
                        <Button
                          label="Close"
                          size="small"
                          type="primary"
                          className="h-[33px] !py-0 !mt-[3px]"
                          onClick={close}
                        />
                      )}
                    </div>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : logo ? (
        <div className={`flex flex-row gap-1 cursor-pointer ${labelClassName}`} onClick={open}>
          <Logo
            icon={logo}
            className={`text-sky-600 ml-[10px] mt-[5px] w-[15px] h-[15px] cursor-pointer ${logoClassName}`}
          />
          <div className="text-sky-600 mr-[15px]" >
          {logoLabel}
          </div>
        </div>
      ) : (
        <Button
          type={buttonType ? buttonType : "primary_inverse"}
          label={buttonLabel}
          className={`ml-[20px] ${labelClassName}`}
          onClick={open}
        />
      )}
    </div>
  );
};

export default PopupModal;
