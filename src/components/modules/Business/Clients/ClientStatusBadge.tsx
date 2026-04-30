import { ClientStatus } from "@/types/client";
import React from "react";
interface BadgeStyle {
  wrapper: string;
  dot: string;
  label: string;
}

const STATUS_STYLES: Record<ClientStatus, BadgeStyle> = {
  active: {
    wrapper: "bg-emerald-400/10 text-emerald-400",
    dot: "bg-emerald-400",
    label: "Active",
  },
  inactive: {
    wrapper: "bg-white/5 text-white/30",
    dot: "bg-white/20",
    label: "Inactive",
  },
};

interface ClientStatusBadgeProps {
  status: ClientStatus;
}

const ClientStatusBadge: React.FC<ClientStatusBadgeProps> = ({ status }) => {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.inactive;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${style.wrapper}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
};

export default ClientStatusBadge;
