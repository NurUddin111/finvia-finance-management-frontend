import { SidebarItem } from "@/components/shared/highlightSideBar";
import BusinessBrand from "./BusinessBrand";
import SettingsAccordion from "./Settings/SettingsMenu";

const BusinessSideBar = () => {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/8 bg-[#030712] lg:flex">
      <div className="flex h-full w-full flex-col px-5 py-6">
        {/* BRAND */}
        <div className="mb-6">
          <BusinessBrand />
        </div>

        {/* SECTION LABEL */}
        <div className="mb-3 px-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
            Workspace
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2">
          <SidebarItem
            label="Dashboard"
            icon="dashboard"
            href="/business/dashboard"
          />
          <SidebarItem
            label="Products"
            icon="products"
            href="/business/dashboard/products"
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

        {/* BOTTOM */}
        <div className="mt-auto pt-6">
          <div className="rounded-3xl border border-blue-500/10 bg-linear-to-b from-blue-500/10 to-transparent p-4">
            <p className="text-sm font-medium text-white">Finvia</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Manage invoices, clients, products and business analytics from one
              workspace.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BusinessSideBar;
