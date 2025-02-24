import Sidebar from "../components/Sidebar";

export default function ClientesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex flex-1">
        <Sidebar />
        <main className="ml-2 mr-2 p-4 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
