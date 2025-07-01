import React, { useState, useEffect } from "react";
import GetAllMappings from "./axios/getAllMappings";
import Mappings from "./mappings";
import Button from "wiremock/components/native/button";
import { useRecoilState } from "recoil";
import { defaultStub, stub } from "wiremock/recoil/atoms";
import FilteredMappings from "./FilteredMappings";
import Logo from "wiremock/components/native/logo";
import usePagination from "../../utils/usePagination";
import PaginationControl from "../../utils/PaginationControl";

const GetMappings = (props) => {
  const [responseData, setResponseData] = useState("");
  const [stubState, setStubState] = useRecoilState(stub);
  const [filteredMappings, setFilteredMappings] = useState([]);
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const handleSelectMapping = (mapping) => {
    setStubState(mapping);
    props.setSelectedMappingId(mapping.id);
    props.setNewMapping(false);
    props.setIsPostMappingsVisible(true);
  };

  useEffect(() => {
    if (!filter) {
      setFilteredMappings(responseData?.mappings || []);
    }
  }, [filter, responseData]);

  const {
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = usePagination(filteredMappings?.length || 0, itemsPerPage);

  const currentMappings =
    filteredMappings?.slice(indexOfFirstItem, indexOfLastItem) || [];

  useEffect(() => {
    goToPage(1);
  }, [filteredMappings, itemsPerPage]);

  return (
    <div className="pr-[10px] flex flex-col h-[90vh] w-full">
      <div className="p-2 flex justify-between z-2">
        <div className="flex gap-3">
          <Logo
            onClick={() => setFilter(!filter)}
            icon="fas fa-filter"
            className="cursor-pointer text-sky-600 mt-3"
          />
          <p className="mr-3 mt-2">Total stubs: {filteredMappings.length}</p>
        </div>
        <div className="flex mr-[10px]">
          <GetAllMappings
            setResponseData={setResponseData}
            loadAgain={props.loadAgain}
            setloadAgain={props.setloadAgain}
            setLoading={setLoading}
          />
          {/* <Button
            icon="fas fa-circle-plus"
            label="Persist"
            onClick={persistData}
          /> */}
          <Button
            icon="fas fa-circle-plus"
            label="New"
            onClick={() => {
              props.setNewMapping(true);
              setStubState(defaultStub);
              props.setIsPostMappingsVisible(true);
            }}
          />
        </div>
      </div>

      {filter && (
        <FilteredMappings
          mappings={responseData?.mappings || []}
          setFilteredMappings={setFilteredMappings}
        />
      )}

      <div className="flex-1 overflow-y-auto px-2">
        {loading ? (
          <p className="flex justify-center items-center h-[calc(100vh-250px)] w-full">
            Loading...
          </p>
        ) : currentMappings.length > 0 ? (
          currentMappings.map((mapping) => (
            <Mappings
              key={mapping.id}
              mapping={mapping}
              setloadAgain={props.setloadAgain}
              setIsPostMappingsVisible={props.setIsPostMappingsVisible}
              selected={props.selectedMappingId === mapping.id}
              filter={filter}
              onSelect={() => handleSelectMapping(mapping)}
            />
          ))
        ) : (
          <p className="flex justify-center items-center h-[calc(100vh-250px)] w-full">
            No mappings available.
          </p>
        )}
      </div>

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        goToPage={goToPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
};

export default GetMappings;
