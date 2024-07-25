import Link from "next/link";
import { ZapIcon } from "lucide-react";
import { HeaderUser } from "./header-user";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

export const Header = () => {
  return (
    <header className="bg-app-900/90 border-b-app-800 border-b h-16 flex px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-2 w-full">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <ZapIcon />
            <span className="sr-only">"next-auth-template"</span>
          </Link>
          <nav className="flex gap-8">
            <Link href="/">Link</Link>
            <Link href="/">Link</Link>
          </nav>
        </div>
        <Suspense fallback={<Skeleton className="h-10 w-10 rounded-full" />}>
          <HeaderUser />
        </Suspense>
      </div>
    </header>
  );
};
