import Link from "next/link";
import { LogOutIcon, MoonIcon, SettingsIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cache } from "react";
import { getProfile } from "@/data-access/profiles";
import { getCurrentUser } from "@/auth/session";
import { Button } from "./ui/button";

const userProfile = cache(getProfile);
 
export const HeaderUser = async () => {
  const user = await getCurrentUser();
  const profile = await userProfile({ userId: user?.id });

  return user?.id ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={profile?.avatarUrl ?? undefined} />
          <AvatarFallback>
            {profile?.displayName?.substring(0, 2).toUpperCase() ||
              profile?.username?.substring(0, 2).toUpperCase() ||
              "X"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2">
            <Avatar className="cursor-pointer">
              <AvatarImage src={profile?.avatarUrl ?? undefined} />
              <AvatarFallback>
                {profile?.displayName?.substring(0, 2).toUpperCase() ||
                  profile?.username?.substring(0, 2).toUpperCase() ||
                  "X"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base">
                {profile?.displayName ?? "View profile"}
              </span>
              <span className="text-muted-foreground text-sm">
                @{profile?.username}
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/user">
            <DropdownMenuItem className="gap-2">
              <UserIcon className="size-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem className="gap-2">
              <SettingsIcon className="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        {/* <Link href="/settings">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DropdownMenuItem className="gap-2 p-0">
                  <SettingsIcon className="w-4 h-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <Link href="/settings/account">
                    <DropdownMenuItem className="gap-2">
                      <ShieldIcon className="w-4 h-4" />
                      <span>Account</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings/profile">
                    <DropdownMenuItem className="gap-2">
                      <UserIcon className="w-4 h-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings/preferences">
                    <DropdownMenuItem className="gap-2">
                      <Settings2Icon className="w-4 h-4" />
                      <span>Preferences</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </Link> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <MoonIcon className="size-4" />
          <span>Dark Mode</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <LogOutIcon className="size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href="/login">
      <Button>Login</Button>
    </Link>
  );
};
