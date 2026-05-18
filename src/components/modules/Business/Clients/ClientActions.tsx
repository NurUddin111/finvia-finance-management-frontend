"use client";

import { useState } from "react";

import { Pencil, Trash2 } from "lucide-react";

import UpdateClientModal from "./EditClient";
import DeleteClientModal from "./DeleteClientModal";
import { IClient } from "@/types/client";

// interface ClientActionsProps {
//   client: {
//     id: string;
//     name: string;
//     email: string;
//     phone?: string;
//     address?: string;
//     totalInvoices: number;
//     totalSpent: number;
//     isDeleted: false;
//     createdAt: Date;
//     updatedAt: Date;
//   };
// }

const actionBtn =
  "group flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300";

export default function ClientActions({ client }: { client: IClient }) {
  const [open, setOpen] = useState<boolean>(false);

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center gap-2">
        {/* EDIT */}
        <button
          title="Edit client"
          onClick={() => setOpen(true)}
          className={`${actionBtn} border-blue-500/20 bg-blue-500/10 text-blue-400 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]`}
        >
          <Pencil
            size={15}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </button>

        {/* DELETE */}
        <button
          title="Delete client"
          onClick={() => setDeleteOpen(true)}
          className={`${actionBtn} border-red-500/20 bg-red-500/10 text-red-400 hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]`}
        >
          <Trash2
            size={15}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </button>
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
