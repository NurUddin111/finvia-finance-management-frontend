import { SidebarItem } from "@/components/shared/highlightSideBar";
import SettingsAccordion from "../Business/Settings/SettingsMenu";
import DemoBusinessBrand from "./DemoBusinessBrand";

const DemoSideBar = () => {
  return (
    <aside className="hidden md:flex w-64 shrink-0 border-r bg-background">
      <div className="flex h-full w-full flex-col px-4 py-6">
        <DemoBusinessBrand />

        {/* Navigation */}
        <nav className="mt-2 flex flex-col gap-1">
          <SidebarItem
            label="Dashboard"
            icon="dashboard"
            href="/demo/dashboard"
          />
          <SidebarItem
            label="Clients"
            icon="clients"
            href="/demo/dashboard/clients"
          />
          <SidebarItem
            label="Invoices"
            icon="invoices"
            href="/demo/dashboard/invoices"
          />
          <SidebarItem
            label="Products"
            icon="products"
            href="/demo/dashboard/products"
          />
          <SettingsAccordion />
        </nav>

        <div className="flex-1" />
      </div>
    </aside>
  );
};

export default DemoSideBar;
