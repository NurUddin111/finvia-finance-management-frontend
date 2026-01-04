"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import UpdateClientModal from "./EditClient";
import DeleteClientModal from "./DeleteClientModal";

export default function ClientActions({
  client,
}: {
  client: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className=" flex w-full justify-end gap-2 md:flex-col md:w-auto">
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          size="sm"
          className=" flex-1 md:flex-none min-w-18 h-9 px-3 border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/10"
        >
          Edit
        </Button>

        <Button
          onClick={() => setDeleteOpen(true)}
          variant="outline"
          size="sm"
          className=" flex-1 md:flex-none min-w-18 h-9 px-3 border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500"
        >
          Delete
        </Button>
      </div>

      <UpdateClientModal
        open={open}
        onClose={() => setOpen(false)}
        client={client}
      />

      <DeleteClientModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        clientId={client.id}
        clientName={client.name}
      />
    </>
  );
}
