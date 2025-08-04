import { Tab, TabContainer } from "wiremock/components/native/tab";
import CategoryInput from "../categoryMappings/categoryInput";
import RoleManager from "../../utils/roleManager";
import Header from "wiremock/components/native/header";
import { getDecryptedUserRole } from "../../../../components/utils/roles";

const SettingsTabs = () => {
  const role = getDecryptedUserRole();
  return (
    <div id="request-specification" className="mt-3">
      <TabContainer size="small" defaultTab={0}>
        <Tab label="Categories">
          <CategoryInput />
        </Tab>
        {/* <Tab label="Roles">
          {process.env.NEXT_PUBLIC_ENABLE_AUTH === "true" ? (
            <RoleManager />
          ) : (
            <Header label="The Auth is disabled" />
          )}
        </Tab> */}
        <Tab label="Roles">
          {role === "admin" ? (
            <RoleManager />
          ) : (
            <p className="flex justify-center items-center h-[calc(100vh-250px)] w-full">
              You are not authorized to view this page...
            </p>
          )}
        </Tab>
      </TabContainer>
    </div>
  );
};

export default SettingsTabs;
