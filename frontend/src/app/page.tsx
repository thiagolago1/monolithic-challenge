import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center w-80">
        <Image src="/images/logo.svg" alt="Logo Image" width={80} height={80} />

        <Link href="/clientes" className="w-full py-3">
          <button className="mt-6 w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition">
            Entrar com SSO
          </button>
        </Link>
      </div>
    </div>
  );
}
