import GetAllMappings from "./getMappings/getAllMappings";
import PostMappings from "./postMappings";
import SidebarLayout from "../layout";
import GetMappings from "./getMappings";
import { useState } from "react";

export default function App() {
  const [newMapping, setNewMapping] = useState(false);
  const [loadAgain, setloadAgain] = useState(true);

  return (
    <SidebarLayout>
      <div className="flex flex-row gap-2">
        <div className="flex gap-2 w-full border-solid border-r-2 border-sky-400">
          <GetMappings setNewMapping={setNewMapping} loadAgain={loadAgain} setloadAgain={setloadAgain}/>
        </div>
        {newMapping ? (
          <PostMappings setNewMapping={setNewMapping} setloadAgain={setloadAgain}/>
        ) : (
          <p className="flex justify-center items-center w-full">Select a Mapping (or) create a new one ~~!</p>
        )}
      </div>
    </SidebarLayout>
  );
}
