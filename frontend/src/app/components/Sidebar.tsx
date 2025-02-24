"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between">

      <div>
        <div className="flex justify-center py-6">
          <div className="rounded-2xl flex flex-col items-center">
            <Image src="/images/logo.svg" alt="Logo Image" width={50} height={50} />
          </div>
        </div>

        <nav className="px-4">
          <Link href="/clientes" className="block">
            <button
              className={`flex items-center gap-2 w-full p-3 rounded-lg text-left ${
                pathname === "/clientes" ? "bg-green-100 text-black" : "text-gray-700"
              }`}
            >
              <Image src="/icons/users-icon.svg" alt="Users Icon" width={24} height={24} />
              Clientes
            </button>
          </Link>

          <Link href="/clientes/cadastrar-cliente" className="block mt-2">
            <button
              className={`flex items-center gap-2 w-full p-3 rounded-lg text-left ${
                pathname === "/clientes/cadastrar-cliente" ? "bg-green-100 text-black" : "text-gray-700"
              }`}
            >
              <Image src="/icons/plus-icon.svg" alt="Plus Icon" width={24} height={24} />
              Cadastrar Cliente
            </button>
          </Link>
        </nav>
      </div>

      <div className="p-4">
      <Link href="/">
        <button className="flex items-center gap-2 text-red-600 w-full p-3 rounded-lg hover:bg-red-100">
          <Image src="/icons/logout-icon.svg" alt="Logout Icon" width={24} height={24} />
          Sair
        </button>
      </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
