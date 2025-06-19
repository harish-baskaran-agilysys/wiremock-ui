import PostMappings from "./postMappings";
import SidebarLayout from "../layout";
import GetMappings from "./getMappings";
import { useEffect, useState } from "react";
import { withAuth } from "wiremock/components/withAuth";

function App() {
  const [newMapping, setNewMapping] = useState(false);
  const [loadAgain, setloadAgain] = useState(true);
  const [selectedMappingId, setSelectedMappingId] = useState(null);

  const [isPostMappingsVisible, setIsPostMappingsVisible] = useState(false);


  return (
    <SidebarLayout>
      <div className="flex flex-row gap-2">
        <div className="flex gap-2 w-[50%] border-solid border-r-2 border-sky-400">
          <GetMappings
            setNewMapping={setNewMapping}
            loadAgain={loadAgain}
            setloadAgain={setloadAgain}
            setIsPostMappingsVisible={setIsPostMappingsVisible}
            selectedMappingId={selectedMappingId}
            setSelectedMappingId={setSelectedMappingId}
          />
        </div>

        <div className="flex gap-2 w-full">
          {isPostMappingsVisible ? (
            <PostMappings
              mode={newMapping ? "create" : "edit"}
              setNewMapping={setNewMapping}
              setloadAgain={setloadAgain}
              selectedMappingId={selectedMappingId}
              setIsPostMappingsVisible={setIsPostMappingsVisible}
            />
            
          ) : <></>}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default withAuth(App);
