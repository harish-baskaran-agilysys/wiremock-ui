import SidebarLayout from "../../layout";
import CategoryInput from "../categoryMappings/categoryInput";
import { withAuth } from "wiremock/components/withAuth";

const SettingsMappings = () => {
  return (
    <SidebarLayout>
      <div className="flex flex-col h-[90vh] w-full">
        <CategoryInput />
      </div>
    </SidebarLayout>
  );
};

export default withAuth(SettingsMappings);
