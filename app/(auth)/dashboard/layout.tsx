export default function DashboardLayout({
  sidebar,
  editor,
}: {
  sidebar: React.ReactNode;
  editor: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-stone-800 p-4">{sidebar}</aside>
      <main className="flex p-4 bg-stone-900 justify-center w-[100%]">
        {editor}
      </main>
    </div>
  );
}
