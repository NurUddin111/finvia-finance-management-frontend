import ClientsHeader from "@/components/modules/Admin/Clients/ClientHeader";
import ClientsFilters from "@/components/modules/Admin/Clients/ClientsFilter";
import ClientsTable from "@/components/modules/Admin/Clients/ClientsTable";

const ClientsPage = () => {
  return (
    <div>
      <div className="space-y-6">
        <ClientsHeader />
        <ClientsFilters />
        <ClientsTable />
      </div>
    </div>
  );
};

export default ClientsPage;
