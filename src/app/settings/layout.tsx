import { Header } from "@/components/header";
import { getCurrentUser } from "@/auth/session";
import { Tabs } from "./tabs";
import { redirect } from "next/navigation";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <>
      <Header />
      <div className="relative">
        <div className="py-12 text-2xl max-w-6xl mx-auto font-medium px-4">
          Account Settings
        </div>
        <hr />
        <div className="flex gap-4 m-8 max-w-6xl mx-auto px-4">
          <div className="relative basis-[20%]">
            <Tabs />
          </div>
          <section className="flex flex-col space-y-4 flex-1">
            {children}
          </section>
        </div>
      </div>
    </>
  );
}
