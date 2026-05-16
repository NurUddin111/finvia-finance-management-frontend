import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser, Sparkles } from "lucide-react";

function formatRole(role: string) {
  return role
    .split("_")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

const DashboardHeader = async ({
  name,
  role,
  avatar,
}: {
  name: string;
  role: string;
  avatar: string | null;
}) => {
  const formattedRole = formatRole(role);

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between mb-8">
      {/* LEFT SIDE */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 p-1.5">
            <Sparkles className="size-4 text-blue-400" />
          </div>

          <span className="text-3xl font-medium tracking-[0.2em] uppercase text-blue-400">
            Analytical Dashboard
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-400 max-w-xl leading-relaxed">
          Monitor revenue, invoices, payments, and client activity from one
          central place.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-white/3
          px-4 py-3
          backdrop-blur-xl
          transition-all duration-300
          hover:border-blue-500/30
          hover:bg-blue-500/4
          hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex items-center gap-3">
          <Avatar className="size-11 border border-white/10 shadow-lg">
            {avatar && <AvatarImage src={avatar} alt={name} />}

            <AvatarFallback className="bg-slate-900 text-slate-300">
              <CircleUser aria-hidden="true" className="opacity-70" size={22} />
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{name}</p>

            <p className="mt-0.5 text-xs tracking-wide text-slate-400">
              {formattedRole}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
