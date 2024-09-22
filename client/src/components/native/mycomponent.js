import React, { useState } from "react";

export function Tab({ label, onClick, active }) {
  let active_flag = active ? true : false;
  return (
    <div
      className={`pb-[3px] px-[25px]  ${
        active_flag
          ? "border-b-[3px] border-solid border-cyan-400 "
          : "text-gray-400"
      }`}
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

function TabContainer({ children, onTabAdd }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabAdd = () => {
    if (onTabAdd) {
      onTabAdd();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row border-b-[1px] border-solid border-gray-300">
        {children.map((tab, index) => (
          <Tab
            key={index}
            active={activeTab === index}
            label={tab.props.label}
            onClick={() => setActiveTab(index)}
          />
        ))}
        <div className="tab-add" onClick={handleTabAdd}>
          +
        </div>
      </div>
      {children.map((tab, index) => (
        <TabContent key={index} active={activeTab === index}>
          {tab.props.children}
        </TabContent>
      ))}
    </div>
  );
}

function MyTabContent({ text }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>{text}</p>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment Count</button>
    </div>
  );
}

function MyComponent() {
  const [tabs, setTabs] = useState([
    {
      label: "Tab 1",
      content: <p>Tab 1 Content</p>,
    },
    {
      label: "Tab 2",
      content: <p>Tab 2 Content</p>,
    },
    {
      label: "Tab 3",
      content: <p>Tab 3 Content</p>,
    },
  ]);

  const handleTabAdd = () => {
    const newTabLabel = `Tab ${tabs.length + 1}`;
    const newTabContent = (
      <MyTabContent text={`This is Tab ${tabs.length + 1}`} />
    );
    setTabs([...tabs, { label: newTabLabel, content: newTabContent }]);
  };

  return (
    <TabContainer onTabAdd={handleTabAdd}>
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab.label}>
          {tab.content}
        </Tab>
      ))}
    </TabContainer>
  );
}

export default MyComponent;
