import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fontSize, typeColor } from "../configuration/config"
import Logo from "../native/logo";
import Button from "../native/button";

const container_styles = (isCollapsed) =>
  `bg-sky-600 h-[calc(100vh-120px)] border-r-2 rounded-lg border-gray-300 transition-all duration-300 overflow-auto  ${
    isCollapsed ? "w-16" : "w-48"
  }`;
const ul_styles = `flex flex-col`;
const li_styles = (isCollapsed) =>
  `ml-[3px] pl-[7px] py-1 ${
    isCollapsed ? "w-[90%]" : "w-[97%]"
  } flex flex-row gap-2 grow hover:bg-sky-400 group hover:rounded hover:cursor-pointer`;
const icon_styles = `text-white bg-sky-600 mt-1 px-1 group-hover:bg-sky-400 group-hover:cursor-pointer`;
const icon_styles_collapsed = `text-white bg-sky-600 pl-[10px] group-hover:bg-sky-400 group-hover:cursor-pointer`;
const span_styles = `!block px-1 pb-1 pt-[2px] w-full group-hover:bg-sky-400`;
const cname_styles = `!block px-1 py-1 w-full`;

const Sidebar = (props) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [expandedSubMenus, setExpandedSubMenus] = useState({});

  const toggleSubMenu = (index) => {
    setExpandedSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  let size = fontSize(props.size);
  let type = typeColor(props.type);

  const getClassNames = (path, baseClasses, extraClasses = "") =>
    `${
      router.pathname === path ? "!bg-gray-700 " : ""
    } ${baseClasses} ${extraClasses}`;

  const renderLogo = (item, isCollapsed) => (
    <Logo
      icon={item.icon}
      className={getClassNames(
        item.path,
        !isCollapsed ? icon_styles : icon_styles_collapsed
      )}
      message={isCollapsed ? item.title : ""}
      onClick={() => setIsCollapsed(false)}
    />
  );

  const renderLink = (item, size, type) => (
    <Link href={item.path} legacyBehavior passHref key={`link-${item.path}`}>
      <a className={getClassNames(item.path, span_styles, `${size} ${type}`)}>
        {item.title}
      </a>
    </Link>
  );

  const renderSubMenu = (subMenu) => {
    return (
      <div className="border-t-[2px] border-solid">
        <ul className={`pl-[20px] pt-[10px]  ${ul_styles}`}>
          {subMenu.map((item, index) => (
            <li
              key={`submenu-item-${index}`}
              className={getClassNames(item.path, `${li_styles(isCollapsed)}`)}
            >
              {renderLogo(item, isCollapsed)}
              {!isCollapsed && renderLink(item, size, type)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={`${container_styles(isCollapsed)}`}>
      <div
        className={` ${
          isCollapsed ? "" : "ml-10 "
        } mt-4 mb-3 flex gap-2 justify-around`}
      >
        {props.companyIcon && (
          <Logo
            icon={props.companyIcon}
            className={` mt-[10px] ${
              isCollapsed ? "" : "mr-5 "
            } ${icon_styles}`}
          />
        )}
        {!isCollapsed && props.companyName && (
          <p className={` ${cname_styles} ${type} ${props.className}`}>
            {props.companyName}
          </p>
        )}
        {props.companyIcon || props.companyName &&
        <Button
          onClick={toggleSidebar}
          type="info"
          className="!p-1 !m-0"
          label={isCollapsed ? ">" : "<"}
        />
        }
      </div>

      <ul className={`${ul_styles}`}>
        {props.menuItems.map((item, index) => (
          <React.Fragment key={`menu-item-fragment-${index}`}>
            <li
              key={`menu-item-${index}`}
              className={getClassNames(item.path, `${li_styles(isCollapsed)}`)}
            >
              {renderLogo(item, isCollapsed)}

              {!item.subMenu ? (
                <div
                  className={`${
                    isCollapsed
                      ? "invisible absolute overflow-hidden w-0 h-0 m-0 p-0 border-0"
                      : ""
                  }`}
                >
                  {renderLink(item, size, type)}
                </div>
              ) : (
                !isCollapsed && (
                  <>
                    <span
                      className={getClassNames(
                        item.path,
                        span_styles,
                        `${fontSize(props.size)} ${typeColor(
                          props.type
                        )} !w-[70%]`
                      )}
                    >
                      {item.title}
                    </span>
                    <button
                      className="ml-2 text-sm text-white justify-last"
                      onClick={() => toggleSubMenu(index)}
                    >
                      {expandedSubMenus[index] ? "▲" : "▼"}
                    </button>
                  </>
                )
              )}
            </li>
            {!isCollapsed && item.subMenu && (
              <React.Fragment key={`submenu-fragment-${index}`}>
                {expandedSubMenus[index] && renderSubMenu(item.subMenu)}
              </React.Fragment>
            )}

            {/* <PopupModal
              flag={isCollapsed}
              containerStyles="bg-sky-600 !pt-1 !pb-2 !pl-0"
            >
              <p>hi there</p>
              {item.subMenu && (
                <>{expandedSubMenus[index] && renderSubMenu(item.subMenu)}</>
              )}
            </PopupModal> */}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
