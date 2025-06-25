import { Tab, TabContainer } from "wiremock/components/native/tab";
import Builder from "./details/builder";
import JSONRepresentation from "../jsonRepresentation";

const BuilderMapping = () => {
  return (
    <div id="request-specification">
      <TabContainer size="medium" defaultTab={0}>
        <Tab label="Builder">
          <Builder />
        </Tab>
        <Tab label="JSON Representation">
          <JSONRepresentation />
        </Tab>
      </TabContainer>
    </div>
  );
};

export default BuilderMapping;
