import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser } from "lucide-react";

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
  avatar: string;
}) => {
  const formattedRole = formatRole(role);
  return (
    <div className="flex items-start justify-between mb-5">
      {/* Left — page title */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Overview of your business performance
        </p>
      </div>

      {/* Right — user card */}
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-card border border-border">
        <Avatar>
          <AvatarImage src={avatar} alt="Profile image" />
          <AvatarFallback>
            <CircleUser aria-hidden="true" className="opacity-60" size={30} />
          </AvatarFallback>
        </Avatar>

        <div className="text-left">
          <p className="text-sm font-medium text-foreground leading-tight">
            {name}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5 tracking-wide">
            {formattedRole}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
