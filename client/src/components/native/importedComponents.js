import { useState } from "react";
import Button from "./button";
import Input from "./input";
import TextArea from "./textarea";
import Import from "./import";
import ImportIcon from "./import_icon";
import Export from "./export";
import ExportIcon from "./export_icon";
import DropdownMulti from "./dropdown_multi";
import Dropdown from "./dropdown_single";
import Filter from "./filter";
import Tabs, { TabContainer, TabContent, Tab } from "./tab";
import DynamicTab from "./dynamicTab";
import MyComponent from "./mycomponent";

const Components = () => {
  const [dataButton, setDataButton] = useState({});
  const [dataInput, setDataInput] = useState("");
  const [data, setData] = useState({});
  const [options, setOptions] = useState([
    {
      label: "New York united states",
      value: "newYork",
      selected: false,
    },
    {
      label: "Oslo",
      value: "oslo",
      selected: false,
    },
    {
      label: "Istanbul",
      value: "istanbul",
      selected: false,
    },
    {
      label: "Salem",
      value: "Salem",
      selected: false,
    },
    {
      label: "Erode",
      value: "Erode",
      selected: false,
    },
    {
      label: "Coimbatore",
      value: "Coimbatore",
      selected: false,
    },
  ]);

  return (
    <>
      <div className="flex">
        <Input
          size="medium"
          placeholder="Enter your value"
          onChange={setDataInput}
          onPaste={setDataInput}
          value={dataInput}
        />
        <Button
          size="medium"
          type="primary"
          label="Button"
          onClick={setDataButton}
        />

        <div className="mt-[5px]">
          <Import size="large" setData={setData} />
        </div>

        <div className="mt-[5px]">
          <Export
            size="large"
            type="large"
            data={data}
            stringify={true}
            fileName="check.json"
          />
        </div>

        <div className="m-[6px]">
          <ImportIcon className="w-[23px] h-[23px]" setData={setData} />
        </div>

        <div className="mt-[5px]">
          <ExportIcon
            className="w-[25px] h-[25px]"
            data={data}
            stringify={true}
            fileName="check.json"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="m-10 flex gap-2">
          {/* <Dropdown
            options={options}
            setOptions={setOptions}
            width={"w-[140px]"}
            height={"h-[40px]"}
            className="mt-[3px]"
          /> */}
          <Input
            size="medium"
            className="h-[40px] mt-[3px] w-[500px]"
            placeholder="Enter your value"
            onChange={setDataInput}
            onPaste={setDataInput}
            value={dataInput}
          />
          <div className="m-[6px]">
            <ImportIcon className="w-[33px] h-[33px]" setData={setData} />
          </div>

          <div className="mt-[5px]">
            <ExportIcon
              className="w-[35px] h-[35px]"
              data={data}
              stringify={true}
              fileName="check.json"
            />
          </div>
          <Button
            size="medium"
            className="h-[40px]"
            type="primary"
            label="Run"
            onClick={setDataButton}
          />
        </div>

        <div className="m-10">
          <Filter
            options={options}
            setOptions={setOptions}
            width={"w-[140px]"}
            height={"h-[50px]"}
          />
        </div>
      </div>

      <div className="m-10">
        <DropdownMulti
          options={options}
          setOptions={setOptions}
          width={"w-[140px]"}
          height={"h-[50px]"}
        />
      </div>
      <div className="flex flex-col ml-[40px]">
        <p className="underline">Imported data : </p>
        <p>{JSON.stringify(data)}</p>
      </div>

      <Tabs />
      <DynamicTab />

      <MyComponent />
    </>
  );
};

export default Components;
