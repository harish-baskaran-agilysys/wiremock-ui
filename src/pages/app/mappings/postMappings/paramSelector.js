import { useState } from "react";
import Button from "wiremock/components/native/button";
import QueryParamMapping from "./query";
import HeadersMapping from "./headers";
import BodyMapping from "./reqBody";
import { Tab, TabContainer } from "wiremock/components/native/tab";

const RequestMapping = () => {
  return (
    <div id="request-specification" className="mt-3">
      <TabContainer size="small">
        <Tab label="Query Params">
          <QueryParamMapping />
        </Tab>
        <Tab label="Headers">
          <HeadersMapping />
        </Tab>  
        <Tab label="Cookies">
          <p>Cookies</p>
        </Tab>
        <Tab label="Body">
          <BodyMapping />
        </Tab>
      </TabContainer>
    </div>
  );
};

export default RequestMapping;
