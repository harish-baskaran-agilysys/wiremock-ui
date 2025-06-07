import { Tab, TabContainer } from "wiremock/components/native/tab";
import RequestFieldMapping from "./requestFieldMapping";

const RequestMapping = () => {
  return (
    <div id="request-specification" className="mt-3">
      <TabContainer size="small" defaultTab={3}>
        <Tab label="Query Params">
          <RequestFieldMapping
            field="queryParameters"
            id="query-req-specification"
          />
        </Tab>
        <Tab label="Headers">
          <RequestFieldMapping field="headers" id="headers-req-specification" />
        </Tab>
        <Tab label="Cookies">
          <RequestFieldMapping field="cookies" id="cookies-req-specification" />
        </Tab>
        <Tab label="Body">
          <RequestFieldMapping
            field="bodyPatterns"
            id="body-req-specification"
          />
        </Tab>
      </TabContainer>
    </div>
  );
};

export default RequestMapping;
