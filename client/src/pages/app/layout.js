import { RecoilRoot } from "recoil";
import Sidebar from "wiremock/components/layouts/sidebar";
import HeaderMapping from "./header";

const sidebarConfig = {
  menuItems: [
    {
      title: "Stubs",
      icon: "fas fa-square-caret-right",
      path: "/app/mappings",
    },
    {
      title: "Request Logs",
      icon: "far fa-file-lines",
      path: "/app/mappings/requestLogging",
    },
    {
      title: "Swagger",
      path: "/app/swagger",
      icon: "fas fa-map",
    },
    {
      title: "Settings",
      path: "/app/mappings/settings",
      icon: "fas fa-gear",
    },
    
    // {
    //   title: "Set-Folder",
    //   path: "/app/mappings/structureMappings",
    //   icon: "fas fa-folder",
    // },
  ],
};

export default function SidebarLayout({ children }) {
  return (
    <RecoilRoot>
      <HeaderMapping />
      <div className="flex">
        <div className="ml-2 mt-2">
          <Sidebar
            menuItems={sidebarConfig.menuItems}
          />
        </div>
        <main className="flex-grow p-4">{children}</main>
      </div>
    </RecoilRoot>
  );
}
