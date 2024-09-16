import React, { useState } from "react";

export function Tab({ label, size, onClick, active }) {
  let active_styles = active
    ? "border-b-[3px] border-solid border-sky-600"
    : "text-gray-600 font-normal";
  let sizes = size == "small" ? "h-[22px] text-[12px]" : " ";
  return (
    <div
      className={`pb-[8px] px-[20px] ${sizes} ${active_styles}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export function TabContent({ children, active }) {
  let active_flag = active ? true : false;
  return (
    <div className={`p-[16px] ${active_flag ? "block" : "hidden"}`}>
      {children}
    </div>
  );
}

export function TabContainer({ size, className, children, firstTab }) {
  const [activeTab, setActiveTab] = useState(firstTab);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-row border-b-[1px] border-solid border-gray-300">
        {children.map((tab, index) => (
          <Tab
            size={size}
            key={index}
            active={activeTab === index}
            label={tab.props.label}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
      {children.map((tab, index) => (
        <TabContent key={index} active={activeTab === index}>
          {tab.props.children}
        </TabContent>
      ))}
    </div>
  );
}

export default function Tabs() {
  return (
    <TabContainer size="small">
      <Tab label="Tab 1">
        <p>Tab 1 Content</p>
      </Tab>
      <Tab label="Tab 2">
        <p>Tab 2 Content</p>
      </Tab>
      <Tab label="Tab 3">
        <p>Tab 3 Content</p>
      </Tab>
    </TabContainer>
  );
}
