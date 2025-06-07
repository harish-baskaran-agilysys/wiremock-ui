import { useRecoilState } from "recoil";
import Header from "wiremock/components/native/header";
import { stub } from "wiremock/recoil/atoms";
import CategorySelector from "./categorySelector";

const MetadataMapping = () => {
  const [reqStub, setReqStub] = useRecoilState(stub);

  return (
    <div className="flex flex-col gap-3 p-5 border-2 border-solid border-sky-300 w-full">
      <div id="CategoryMappingId" className="flex flex-col gap-2">
        <CategorySelector />
      </div>
      <div id="Author-Name" className="flex flex-row gap-3">
        <Header label="Author Name" />
        <p className="mt-2">{reqStub.metadata?.author}</p>
      </div>
      <div id="Author-email" className="flex flex-row gap-3">
        <Header label="Author Email" />
        <p className="mt-2">{reqStub.metadata?.author_email}</p>
      </div>
       <div id="Last-email" className="flex flex-row gap-3">
        <Header label="Last Updated By Email" />
        <p className="mt-2">{reqStub.metadata?.lastUpdatedBy_email}</p>
      </div>
    </div>
  );
};

export default MetadataMapping;
