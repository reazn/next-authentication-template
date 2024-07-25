"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settings = [
  { name: "Account", href: "/settings/account" },
  { name: "Profile", href: "/settings/profile" },
  { name: "Preferences", href: "/settings/preferences" },
];

export const Tabs = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2 sticky top-[5rem]">
      {settings.map((setting) => (
        <Link
          className={cn(
            `rounded-md p-1.5 px-2.5 hover:bg-muted text-muted-foreground`,
            pathname === setting.href &&
              "text-primary font-medium bg-primary-foreground",
          )}
          key={setting.name}
          href={setting.href}
        >
          {setting.name}
        </Link>
      ))}
    </nav>
  );
};
