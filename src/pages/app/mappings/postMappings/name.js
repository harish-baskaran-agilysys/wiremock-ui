import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Header from "wiremock/components/native/header";
import Input from "wiremock/components/native/input";
import { stub } from "wiremock/recoil/atoms";

const NameMapping = () => {
  const [reqStub, setReqStub] = useRecoilState(stub);

  const [selected, setSelected] = useState("");

  useEffect(() => {
   
    const updatedReqStub = {
      ...reqStub,
      "name": selected,
    };
  
    setReqStub(updatedReqStub);
  }, [selected]);

  return (
    <div
      id="Name"
      className="flex flex-row gap-3 p-5 border-2 border-solid border-sky-300 w-full"
    >
      <Header label="Name" className={"pb-2"} />
      <Input className={"w-[500px]"} value={selected} setValue={setSelected} />
    </div>
  );
};

export default NameMapping;
