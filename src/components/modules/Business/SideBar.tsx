import { SidebarItem } from "@/components/shared/highlightSideBar";
import BusinessBrand from "./BusinessBrand";
import SettingsAccordion from "./Settings/SettingsMenu";

const BusinessSideBar = () => {
  return (
    <aside className="hidden md:flex w-64 shrink-0 border-r bg-background">
      <div className="flex h-full w-full flex-col px-4 py-6">
        <BusinessBrand />

        {/* Navigation */}
        <nav className="mt-2 flex flex-col gap-1">
          <SidebarItem
            label="Dashboard"
            icon="dashboard"
            href="/business/dashboard"
          />
          <SidebarItem
            label="Clients"
            icon="clients"
            href="/business/dashboard/clients"
          />
          <SidebarItem
            label="Invoices"
            icon="invoices"
            href="/business/dashboard/invoices"
          />
          <SettingsAccordion />
        </nav>

        <div className="flex-1" />
      </div>
    </aside>
  );
};

export default BusinessSideBar;
