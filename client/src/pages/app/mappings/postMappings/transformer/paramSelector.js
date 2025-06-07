import { Tab, TabContainer } from "wiremock/components/native/tab";
import TransformerFieldMapping from "./transformerFieldMapping";

const ResponseTabs = () => {
  return (
    <div id="request-specification" className="mt-3">
      <TabContainer size="small" defaultTab={1}>
        <Tab label="Headers">
          <TransformerFieldMapping
            field="headers"
            id="headers-trans-specification"
          />
        </Tab>
        <Tab label="Body">
          <TransformerFieldMapping field="body" id="body-trans-specification" />
        </Tab>
      </TabContainer>
    </div>
  );
};

export default ResponseTabs;
