import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CircleUser } from "lucide-react";

const DashboardHeader = async ({
  name,
  role,
  avatar,
}: {
  name: string;
  role: string;
  avatar: string;
}) => {
  return (
    <div className="space-y-6">
      {/* Top bar */}
      <header className="flex h-16 items-center justify-end border-b bg-background px-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={avatar} alt="Profile image" />
            <AvatarFallback>
              <CircleUser aria-hidden="true" className="opacity-60" size={30} />
            </AvatarFallback>
          </Avatar>

          <div className="text-sm leading-tight">
            <p className="font-medium truncate max-w-35">{name}</p>
            <p className="text-xs text-muted-foreground truncate max-w-35">
              {role}
            </p>
          </div>
        </div>
      </header>

      {/* Page heading */}
      <div className="px-6">
        <h1 className="text-2xl font-semibold leading-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your business performance
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
