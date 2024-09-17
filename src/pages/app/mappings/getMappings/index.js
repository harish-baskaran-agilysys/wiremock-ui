import React, { useState } from "react";
import PersistAllMappings from "./persistAllMappings";
import GetAllMappings from "./getAllMappings";
import Mappings from "./mappings";
import Button from "wiremock/components/native/button";
import Pagination from "./pagination";
import usePagination from "./usePagination";

const GetMappings = (props) => {
 
  const [responseData, setResponseData] = useState("");
  const [selectedMappingId, setSelectedMappingId] = useState(null);

  const itemsPerPage = 5; // Set the number of items per page

  // Use custom pagination hook
  const {
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(responseData?.mappings?.length || 0, itemsPerPage);

  // Get the current mappings to display on the current page
  const currentMappings =
    responseData?.mappings?.slice(indexOfFirstItem, indexOfLastItem) || [];

  return (
    <div className="mt-[10px] pr-[10px] flex flex-col h-full w-full">
      <div className="flex justify-between mr-[10px]">
        <div className="flex gap-1 ">
          <GetAllMappings setResponseData={setResponseData} loadAgain={props.loadAgain} setloadAgain={props.setloadAgain}/>
          <PersistAllMappings setResponseData={setResponseData} />
        </div>
        <Button
          icon="fas fa-circle-plus"
          label="New"
          onClick={() => props.setNewMapping(true)}
        />
      </div>
      <br />
      {/* Render current page of mappings */}
      {currentMappings.length > 0 ? (
        currentMappings.map((mapping) => (
          <Mappings
            key={mapping.id}
            mapping={mapping}
            setloadAgain={props.setloadAgain}
            selected={selectedMappingId === mapping.id}
            onSelect={() => setSelectedMappingId(mapping.id)}
          />
        ))
      ) : (
        <p className="flex justify-center items-center h-[calc(100vh-250px)] w-full">
          No mappings available.
        </p>
      )}

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
      />
    </div>
  );
};

export default GetMappings;
