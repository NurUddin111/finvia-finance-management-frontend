/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUsers } from "@/services/admin/getAllUser";
import ClientActions from "./ClientActions";

export default async function ClientsTable() {
  const res = await getAllUsers();
  const clients = res.success ? res.data : [];

  return (
    <>
      {/*  Mobile Cards  */}
      <div className="space-y-4 md:hidden">
        {clients.map((client: any) => (
          <div
            key={client.id}
            className="w-full rounded-xl border bg-background p-4 space-y-4"
          >
            {/* Name */}
            <div>
              <p className="font-medium truncate">{client?.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                {client?.email}
              </p>
              <p className="text-sm text-muted-foreground">
                {client?.phone || "-"}
              </p>
            </div>

            {/* Role */}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Role</span>
              <span className="truncate max-w-[60%] text-right">
                {client?.role || "-"}
              </span>
            </div>

            {/* Business */}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Business</span>
              <span className="truncate max-w-[60%] text-right">
                {client?.businessUsers?.length
                  ? client.businessUsers
                      .map((bu: any) => bu?.business?.name)
                      .join(", ")
                  : "-"}
              </span>
            </div>

            {/* Actions */}
            <ClientActions client={client} />
          </div>
        ))}

        {clients.length === 0 && (
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            No clients found!
          </div>
        )}
      </div>

      {/* 💻 Desktop / Tablet Table */}
      <div className="hidden md:block w-full overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left w-1/4">Name</th>
              <th className="p-4 text-center w-1/4">Contact</th>
              <th className="p-4 text-center w-1/6">Role</th>
              <th className="p-4 text-left w-1/4">Business</th>
              <th className="p-4 text-center w-1/6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client: any) => (
              <tr key={client.id} className="border-t">
                <td className="p-4 font-medium truncate">{client?.name}</td>

                <td className="p-4 text-muted-foreground text-center">
                  <div className="truncate">{client?.email}</div>
                  <div>{client?.phone || "-"}</div>
                </td>

                <td className="p-4 text-muted-foreground text-center truncate">
                  {client?.role}
                </td>

                <td className="p-4 text-muted-foreground">
                  <div className="truncate">
                    {client?.businessUsers?.map(
                      (bu: any) => bu?.business?.name
                    )}
                  </div>
                </td>

                <td className="p-4 text-center">
                  <ClientActions client={client} />
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
