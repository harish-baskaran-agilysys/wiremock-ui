import React, { useState } from "react";

function Tab({ label, onClick, active }) {
  return (
    <div className={`tab ${active ? "active" : ""}`} onClick={onClick}>
      {label}
    </div>
  );
}

function TabContent({ children, active }) {
  return (
    <div className={`tab-content ${active ? "active" : ""}`}>{children}</div>
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

function TabContainer({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      <div className="tab-list">
        {children.map((tab, index) => (
          <Tab
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

function DynamicTab() {
  return (
    <TabContainer>
      <Tab label="Tab 1">
        <MyTabContent text="This is Tab 1" />
      </Tab>
      <Tab label="Tab 2">
        <MyTabContent text="This is Tab 2" />
      </Tab>
    </TabContainer>
  );
}

export default DynamicTab;
