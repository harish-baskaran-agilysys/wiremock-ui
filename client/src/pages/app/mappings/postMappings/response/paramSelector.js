import { Tab, TabContainer } from "wiremock/components/native/tab";
import ResponseFieldMapping from "./responseFieldMapping";

const ResponseTabs = () => {
  return (
    <div id="request-specification" className="mt-3">
      <TabContainer size="small" defaultTab={1}>
        <Tab label="Headers">
          <ResponseFieldMapping
            field={"headers"}
            id="headers-res-specification"
          />
        </Tab>
        <Tab label="Body">
          <ResponseFieldMapping field={"body"} id="body-res-specification" />
        </Tab>
      </TabContainer>
    </div>
  );
};

export default ResponseTabs;
