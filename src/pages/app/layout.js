import { RecoilRoot } from "recoil";
import Sidebar from "../../components/layouts/sidebar";
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
      path: "/app/logs",
    },
    {
      title: "Settings",
      path: "/app/settings",
      icon: "fas fa-gear",
    },
  ],
};

export default function SidebarLayout({ children }) {
  return (
    <RecoilRoot>
      <HeaderMapping />
      <div className="flex">
        <div className="ml-5 my-5">
          <Sidebar
            //companyName="Thruways"
            //companyIcon="fas fa-text-width"
            menuItems={sidebarConfig.menuItems}
          />
        </div>
        <main className="flex-grow p-4">{children}</main>
      </div>
    </RecoilRoot>
  );
}
