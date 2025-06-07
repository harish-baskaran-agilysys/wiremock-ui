import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Header from "wiremock/components/native/header";
import Input from "wiremock/components/native/input";
import { stub } from "wiremock/recoil/atoms";

const NameMapping = () => {
  const [reqStub, setReqStub] = useRecoilState(stub);

  const [selected, setSelected] = useState(reqStub.name || "");
  const [selectedPriority, setSelectedPriority] = useState(reqStub.priority || "");

  useEffect(() => {
    setSelected(reqStub.name || "");
  }, [reqStub.name]);

  useEffect(() => {
    if (reqStub.name !== selected) {
      setReqStub((prevStub) => ({
        ...prevStub,
        name: selected,
      }));
    }
  }, [selected]);

  useEffect(() => {
    if (reqStub.priority !== selectedPriority) {
      setReqStub((prevStub) => ({
        ...prevStub,
        priority: selectedPriority,
      }));
    }
  }, [selectedPriority]);

  return (
    <div className="flex flex-col gap-3 p-5 border-2 border-solid border-sky-300 w-full">
      <div
        id="mappingId"
        className="flex flex-row gap-3"
      >
        <Header label="Mapping Id"/>
        <p className="mt-2">{reqStub.id ?? "--"}</p>
      </div>
      <div
        id="Name"
        className="flex flex-row gap-3"
      >
        <Header label="Name" className={"pb-2"} />
        <Input className={"w-[500px]"} value={selected} setValue={setSelected} />
      </div>
      <div
        id="Priority"
        className="flex flex-row gap-3"
      >
        <Header label="Priority"/>
        <Input className={"w-[500px]"} value={selectedPriority} setValue={setSelectedPriority} />
      </div>
    </div>
  );
};

export default NameMapping;
