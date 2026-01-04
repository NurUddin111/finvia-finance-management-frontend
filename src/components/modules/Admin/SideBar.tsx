import { SidebarItem } from "@/components/shared/highlightSideBar";
import BrandFinvia from "@/components/shared/BrandFinvia";
import SettingsAccordion from "./Settings/SettingsMenu";

const FinviaAdminSideBar = () => {
  return (
    
    <aside className="hidden md:flex w-64 shrink-0 border-r bg-background">
      <div className="flex h-full w-full flex-col px-4 py-6">
        <BrandFinvia />

        <nav className="mt-2 flex flex-col gap-1">
          <SidebarItem
            label="Dashboard"
            icon="dashboard"
            href="/admin/dashboard"
          />
          <SidebarItem
            label="Clients"
            icon="clients"
            href="/admin/dashboard/clients"
          />
          <SettingsAccordion />
        </nav>

        <div className="flex-1" />
      </div>
    </aside>
  );
};

export default FinviaAdminSideBar;
