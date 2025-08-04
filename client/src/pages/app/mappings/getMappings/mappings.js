import React, { useState } from "react";
import Logo from "wiremock/components/native/logo";
import { deleteData } from "wiremock/axios";
import { getDataById, postData } from "wiremock/axios";
import { useSession } from "next-auth/react";
import Tooltip from "wiremock/components/native/tooltip";
import { getDecryptedUserRole } from "wiremock/components/utils/roles";
import { cleanStubData } from "wiremock/components/utils/cleanStub";

const Mappings = (props) => {
  const {
    mapping,
    selected,
    onSelect,
    setloadAgain,
    setIsPostMappingsVisible,
    filter,
  } = props;
  const role = getDecryptedUserRole();
  const { data: session, status } = useSession();

  const DeleteMappings = async (id) => {
    try {
      await deleteData(id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const DuplicateMappings = async (id, session) => {
    try {
      const originalStub = await getDataById(id);
      if (!originalStub) {
        throw new Error("Mapping not found");
      }

      // Clone and clean the original stub
      const cleanedStub = cleanStubData(originalStub, session);

      // Remove the original ID so WireMock treats it as a new mapping
      delete cleanedStub.id;
      delete cleanedStub.uuid;

      // Append " - Copy" to the name (if present)
      if (cleanedStub.name) {
        cleanedStub.name = `${cleanedStub.name} - Copy`;
      }

      await postData(cleanedStub);
    } catch (error) {
      console.error("Failed to duplicate mapping:", error.message);
    }
  };

  return (
    <div
      className={`flex gap-2 rounded-lg border border-solid px-[10px] py-[10px] mb-[10px]
        min-w-full cursor-pointer ${
          selected ? "border-sky-400" : "border-gray-300"
        }`}
      onClick={onSelect}
    >
      <p
        className={`border-2 border-solid ${
          selected ? "border-sky-400" : "border-gray-300"
        }`}
      ></p>
      <div className="flex-1 flex-col justify-between gap-2" id="">
        <div className="flex justify-between ">
          <Tooltip message={mapping?.name} position="down">
            <p className="truncate font-bold" key={mapping?.id || "unknown"}>
              {mapping?.name
                ? mapping.name.length > 40
                  ? `${mapping.name.slice(0, 40)}...`
                  : mapping.name
                : "Unnamed Mapping"}
            </p>
          </Tooltip>
          {role !== "viewer" ? (
            <div className="flex gap-2">
              <Logo
                onClick={async () => {
                  if (
                    window.confirm(
                      "Are you sure you want to duplicate this mapping?"
                    )
                  ) {
                    await DuplicateMappings(mapping.id, session);
                    setloadAgain(true);
                    setIsPostMappingsVisible(false);
                  }
                }}
                icon="fas fa-copy"
                className="cursor-pointer text-sky-600 mt-1"
              />
              <Logo
                onClick={async () => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this mapping?"
                    )
                  ) {
                    await DeleteMappings(mapping.id);
                    setloadAgain(true);
                    setIsPostMappingsVisible(false);
                  }
                }}
                icon="fas fa-trash"
                className="cursor-pointer text-red-400 mt-1"
              />
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="flex gap-1">
          <p className="text-sky-600 font-bold">
            {mapping?.request?.method || "N/A"}
          </p>
          <p>{mapping?.response?.status || "N/A"}</p>
          <p>{mapping?.request?.urlPath || "N/A"}</p>
        </div>
        <div className="flex gap-1 text-sky-600">
          <p>Author : </p>

          <p>{mapping?.metadata?.author_email || "Unknown Author"}</p>
        </div>
      </div>
    </div>
  );
};

export default Mappings;
