import { useState } from "react";
import Header from "wiremock/components/native/header";
import NameMapping from "./name";
import MethodMapping from "./method";
import RequestMapping from "./paramSelector";
import Button from "wiremock/components/native/button";
import ResponseMapping from "./response";
import { postStub } from "wiremock/recoil/selectors";
import { useRecoilValue } from "recoil";
import { postData } from "wiremock/axios";
import TextArea from "wiremock/components/native/textarea";

const PostMappings = () => {
  const stub = useRecoilValue(postStub);

  const [request, setRequest] = useState(true);
  const [response, setResponse] = useState(true);

  const handleButtonClick = async () => {
    try {
      const data = await postData(stub);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-10 ml-4">
      <div className="flex flex-col">
        <div className="flex mt-2 justify-between">
         
          <Header label="Post Mappings" className={"pt-1 pb-5"} />
          <Button
            icon="fas fa-save"
            label="Save"
            className={"mt-2 p-0 rounded-full"}
            onClick={() => handleButtonClick()}
          />
        </div>

        <NameMapping />

        <Button
          label="Request"
          className="rounded-full w-[110px] my-3 !pl-0"
          end_icon={request ? "fas fa-caret-down" : "fas fa-caret-up"}
          onClick={() => setRequest(!request)}
        />
        {request && <MethodMapping />}

        <Button
          label="Response"
          className="rounded-full w-[110px] my-3 !pl-0"
          end_icon={response ? "fas fa-caret-down" : "fas fa-caret-up"}
          onClick={() => setResponse(!response)}
        />
        {response && <ResponseMapping />}
      </div>
      <div className="border-l-2 border-solid border-sky-400">
        <div className="ml-4 mt-4">
          <p className="text-sky-600 text-bold underline mb-3"> JSON representations ::</p>
          <TextArea value={JSON.stringify(stub, null, 2)} className="w-[500px] h-[750px] border border-sky-400" readOnly={true}/>
        </div>
      </div>
    </div>
  );
};

export default PostMappings;
