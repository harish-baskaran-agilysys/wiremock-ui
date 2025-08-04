import React, { useState } from "react";
import Logo from "wiremock/components/native/logo";

import DeleteMappings from "./axios/deleteMappings";
import DuplicateMappings from "./axios/duplicateMappings";
import { useSession } from "next-auth/react";
import { getDecryptedUserRole } from "../../utils/roles";
import Tooltip from "wiremock/components/native/tooltip";

const Mappings = (props) => {
  const { mapping, selected, onSelect, setloadAgain, setIsPostMappingsVisible, filter } = props;
  const role = getDecryptedUserRole();
  const { data: session, status } = useSession();

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
          <Tooltip message={mapping.name} position="down">
          <p className="truncate font-bold" key={mapping.id}>
            {mapping.name.length > 40
              ? `${mapping.name.slice(0, 40)}...`
              : mapping.name}
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
          <p className="text-sky-600 font-bold">{mapping.request.method}</p>
          <p>{mapping.response.status}</p>
          <p>{mapping.request.urlPath}</p>
        </div>
        <div className="flex gap-1 text-sky-600">
          <p>Author : </p>
          <p>{mapping.metadata?.author_email}</p>
        </div>
      </div>
    </div>
  );
};

export default Mappings;
