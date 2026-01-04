import {
  BookOpenIcon,
  Car,
  IdCard,
  LogOutIcon,
  UserPenIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserDropDown = () => {
  return (
    <div className="mr-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <div className="relative">
              <Avatar>
                <AvatarImage src="" alt="Profile image" />
                <AvatarFallback className="bg-white text-black">NU</AvatarFallback>
              </Avatar>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              Nur Uddin
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              nuruddinmuhammad38@gmail.com
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem className="flex gap-2 items-center">
              <IdCard size={16} className="opacity-60" aria-hidden="true" />
              <p>View Profile</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex gap-2 items-center">
              <Car size={16} className="opacity-60" aria-hidden="true" />
              <p>Change Password</p>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup className="flex flex-col items-start">
            <DropdownMenuItem>
              <UserPenIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Option 5</span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <BookOpenIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>History</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
