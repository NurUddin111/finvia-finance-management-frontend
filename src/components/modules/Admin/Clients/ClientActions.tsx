"use client";

import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import UpdateClientModal from "./EditClient";
import DeleteClientModal from "./DeleteClientModal";

interface ClientActionsProps {
  client: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
}

export default function ClientActions({ client }: ClientActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center gap-1.5">
        {/* View — no modal yet, wire when ready */}
        <button
          title="View client"
          className="w-7.5 h-7.5 rounded-[7px] flex items-center justify-center bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all duration-150"
        >
          <Eye size={14} />
        </button>

        {/* Edit */}
        <button
          title="Edit client"
          onClick={() => setOpen(true)}
          className="w-7.5 h-7.5 rounded-[7px] flex items-center justify-center bg-violet-500/15 text-violet-300 hover:bg-violet-500/30 hover:text-violet-200 transition-all duration-150"
        >
          <Pencil size={14} />
        </button>

        {/* Delete */}
        <button
          title="Delete client"
          onClick={() => setDeleteOpen(true)}
          className="w-7.5 h-7.5 rounded-[7px] flex items-center justify-center bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-150"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Your existing modals — untouched */}
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
