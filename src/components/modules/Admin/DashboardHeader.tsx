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
  avatar: string | null;
}) => {
  return (
    <div className="space-y-4">
      <header className="flex min-h-16 items-center justify-end border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar className="h-9 w-9">
            {avatar && <AvatarImage src={avatar} alt="Profile image" />}
            <AvatarFallback>
              <CircleUser aria-hidden="true" className="opacity-60" size={24} />
            </AvatarFallback>
          </Avatar>

          <div className="text-sm leading-tight">
            <p className="font-medium truncate max-w-35 sm:max-w-none">
              {name}
            </p>
            <p className="text-xs text-muted-foreground truncate">{role}</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-1 px-4 sm:px-6">
        <h1 className="text-2xl font-semibold leading-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Overview of your business performance
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
