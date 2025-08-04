import Header from "wiremock/components/native/header";
import FolderTree from "./FolderView ";
import { withAuth } from "wiremock/components/utils/withAuth";

const StructureMappings = (props) => {


  return (
    <div className="flex flex-col h-[90vh] w-full">
      <div className="flex flex-col mt-2 justify-between">
        <Header size="large" label="Mapping Detail" className={"pt-1 pb-5"} />

        <FolderTree/>
      </div>

    </div>
  );
};

export default withAuth(StructureMappings);
