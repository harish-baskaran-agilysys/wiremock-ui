import { Tab, TabContainer } from "wiremock/components/native/tab";
import CategoryInput from "../categoryMappings/categoryInput";
import RoleManager from "../../utils/roleManager";

const SettingsTabs = () => {
  return (
    <div id="request-specification" className="mt-3">
      <TabContainer size="small" defaultTab={1}>
        <Tab label="Categories">
          <CategoryInput />
        </Tab>
        <Tab label="Roles">
          <RoleManager />
        </Tab>
      </TabContainer>
    </div>
  );
};

export default SettingsTabs;
