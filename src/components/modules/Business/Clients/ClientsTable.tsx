/* eslint-disable @typescript-eslint/no-explicit-any */
import ClientActions from "./ClientActions";
import { getAllClients } from "@/services/business/clients/getAllClients";

export default async function ClientsTable() {
  const res = await getAllClients();
  const clients = res.success ? res.data : [];

  return (
    <>
      <div className="space-y-3 md:hidden">
        {clients.map((client: any) => (
          <div
            key={client.id}
            className="w-full max-w-full rounded-xl border bg-background p-4 space-y-3"
          >
            <div className="space-y-1">
              <p className="font-medium truncate">{client?.client.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                {client?.client.email}
              </p>
              <p className="text-sm text-muted-foreground">
                {client.phone || "-"}
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Invoices</span>
              <span>{client.totalInvoices ?? 0}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Added</span>
              <span>{client.createdAt}</span>
            </div>

            {/* Actions: full width on mobile */}
            <ClientActions client={client?.client} />
          </div>
        ))}

        {clients.length === 0 && (
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            No clients found!
          </div>
        )}
      </div>

      {/* 💻 Desktop / Tablet */}
      <div className="hidden md:block w-full max-w-full overflow-x-auto rounded-lg border">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left w-1/4 ">Name</th>
              <th className="p-4 text-left w-1/4">Contact</th>
              <th className="p-4 text-center w-1/6">Invoices</th>
              <th className="p-4 text-center w-1/6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client: any) => (
              <tr key={client.id} className="border-t">
                <td className="p-4 font-medium truncate">
                  {client?.client.name}
                </td>

                <td className="p-4 text-muted-foreground">
                  <div className="truncate">{client?.client.email}</div>
                  <div>{client?.client.phone || "-"}</div>
                </td>

                <td className="p-4 text-center">
                  {client?.client.totalInvoices ?? 0}
                </td>

                <td className="p-4">
                  <ClientActions client={client?.client} />
                </td>
              </tr>
            ))}

            {clients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-muted-foreground"
                >
                  No clients found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
