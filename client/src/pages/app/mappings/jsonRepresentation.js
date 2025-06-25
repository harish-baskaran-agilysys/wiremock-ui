import { useRecoilState } from "recoil";
import JSONEditor from "../utils/monaco";
import { stub } from "wiremock/recoil/atoms";

const JSONRepresentation = () => {
  const [reqStub, setReqStub] = useRecoilState(stub);

  return reqStub ? (
    <JSONEditor
      value={reqStub}
      beautifyToggle={false}
      height="h-[75vh]"
    />
  ) : null;
};

export default JSONRepresentation;
