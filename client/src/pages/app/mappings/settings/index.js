import SidebarLayout from "../../layout";
import { withAuth } from "wiremock/components/utils/withAuth";
import SettingsTabs from "./paramSelector";
import { getDecryptedUserRole } from "../../../../components/utils/roles";

const SettingsMappings = () => {
  const role = getDecryptedUserRole();

  return (
    <SidebarLayout>
      {role !== "viewer" ? (
        <SettingsTabs />
      ) : (
        <p className="flex justify-center items-center h-[calc(100vh-250px)] w-full">
          You are not authorized to view this page...
        </p>
      )}
    </SidebarLayout>
  );
};

export default withAuth(SettingsMappings);
