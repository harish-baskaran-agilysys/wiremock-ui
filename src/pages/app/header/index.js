import React from "react";
import Button from "wiremock/components/native/button";
import ServerHandling from "./serverHandling";

const HeaderMapping = () => {
  return (
    <div className="border-b-2 border-sky-400 border-solid flex justify-between w-full">
      <img
        src="/wm_logo.jpeg"
        alt="Logo"
        className="w-[125px] h-[70px] !p-0 !m-0"
      />
      <div className="flex gap-2">
        <div className="mt-5">
        <ServerHandling />
        </div>
        <Button
          icon="fab fa-github"
          label="Github"
          type="primary_inverse"
          className="mr-5 mt-5"
        />
      </div>
    </div>
  );
};

export default HeaderMapping;
