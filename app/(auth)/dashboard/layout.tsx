import { logout } from "@/actions/auth-actions";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  sidebar,
  editor,
}: {
  sidebar: React.ReactNode;
  editor: React.ReactNode;
}) {
  const loginResult = await getCurrentUser();
  if (!loginResult.user) {
    return redirect("/auth");
  }
  return (
    <div className="flex h-screen">
      <form action={logout}>
        <button className="absolute bg-stone-900 p-2 right-0">Log Out</button>
      </form>
      <aside className="w-64 bg-stone-800 p-4">{sidebar}</aside>
      <main className="flex p-4 bg-stone-900 justify-center w-[100%]">
        {editor}
      </main>
    </div>
  );
}
