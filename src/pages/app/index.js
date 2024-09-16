import GetAllMappings from "./getMappings";
import PostMappings from "./postMappings";
import PersistAllMappings from "./persistMappings";
import HeaderMapping from "./header";

export default function App() {
  return (
    <div className="w-full">
    <HeaderMapping />
    <div className="flex flex-row gap-2">
      <div className="flex gap-2 w-[20%] border-solid border-r-2 border-sky-400">
        <GetAllMappings />
      </div>
      <PostMappings />
    </div>
    </div>
  );
}
