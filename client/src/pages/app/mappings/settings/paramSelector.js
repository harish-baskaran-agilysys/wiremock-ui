import { Tab, TabContainer } from "wiremock/components/native/tab";
import CategoryInput from "../categoryMappings/categoryInput";
import RoleManager from "../../utils/roleManager";
import Header from "wiremock/components/native/header";

const SettingsTabs = () => {
  return (
    <div id="request-specification" className="mt-3">
      <TabContainer size="small" defaultTab={1}>
        <Tab label="Categories">
          <CategoryInput />
        </Tab>
        <Tab label="Roles">
          {process.env.NEXT_PUBLIC_ENABLE_AUTH === "true" ? (
            <RoleManager />
          ) : (
            <Header label="The Auth is disabled" />
          )}
        </Tab>
      </TabContainer>
    </div>
  );
};

export default SettingsTabs;
