import { useRecoilState, useRecoilValue } from "recoil";
import TextArea from "wiremock/components/native/textarea";
import { postStub } from "wiremock/recoil/selectors";
import JSONEditor from "./monaco";
import { stub } from "wiremock/recoil/atoms";

const JSONRepresentation = () => {
  const [reqStub, setReqStub] = useRecoilState(stub);

  return (
    reqStub?
   <JSONEditor value={JSON.stringify(reqStub, null, 2)} setValue={setReqStub} height="h-[75vh]"/>
   : <></>
  );
};

export default JSONRepresentation;
