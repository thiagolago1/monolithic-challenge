"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { addCostumerSchema } from "@/schemas/add-costumer.schema";
import { useAddCostumer } from "@/hooks/costumers.mutations";
import { AddCostumer } from "@/types/costumer";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof addCostumerSchema>;

export default function CadastrarClientePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(addCostumerSchema),
  });

  const addCostumer = useAddCostumer();

  const onSubmit = async(data: FormData) => {
    const body: AddCostumer = {
      ...data,
      birth: data.birth + 'T00:00:00.000Z'
    }
    try {
      await addCostumer.mutateAsync(body);
      reset();
      router.push("/clientes")
    } catch (error: unknown) {
      console.log("error addCostumer", error)
    }
  };

  return (
    <div className="">
      <div className="flex items-center mb-6">
        <Link href={"/clientes"}>
          <Image src="/icons/chevron-left-icon.svg" alt="Voltar" width={24} height={24} />
        </Link>
        <h1 className="ml-2 text-2xl font-semibold text-black">Cadastrar Cliente</h1>
      </div>

      <div className="bg-zinc-900 text-white p-6 rounded-lg w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <input
              {...register("name")}
              type="text"
              placeholder="Nome *"
              className="w-full p-3 bg-black rounded-lg border border-gray-700 outline-none focus:border-green-500"
            />
            <Image src="/icons/text-icon.svg" alt="Nome" width={16} height={16} className="absolute right-4 top-3" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="relative">
            <input
              {...register("email")}
              type="email"
              placeholder="E-mail *"
              className="w-full p-3 bg-black rounded-lg border border-gray-700 outline-none focus:border-green-500"
            />
            <Image src="/icons/email-icon.svg" alt="E-mail" width={20} height={20} className="absolute right-4 top-3" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <input
              {...register("phone")}
              type="tel"
              placeholder="Telefone *"
              className="w-full p-3 bg-black rounded-lg border border-gray-700 outline-none focus:border-green-500"
            />
            <Image src="/icons/phone-icon.svg" alt="Telefone" width={20} height={20} className="absolute right-4 top-3" />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div className="relative">
            <input
              {...register("birth")}
              type="date"
              className="w-full p-3 bg-black rounded-lg border border-gray-700 outline-none focus:border-green-500"
            />
            <Image
              src="/icons/calendar-icon.svg"
              alt="Data de nascimento"
              width={20}
              height={20}
              className="absolute right-4 top-3"
            />
            {errors.birth && <p className="text-red-500 text-sm mt-1">{errors.birth.message}</p>}
          </div>

          <div className="relative col-span-2">
            <input
              {...register("address")}
              type="text"
              placeholder="Endereço *"
              className="w-full p-3 bg-black rounded-lg border border-gray-700 outline-none focus:border-green-500"
            />
            <Image
              src="/icons/location-icon.svg"
              alt="Endereço"
              width={20}
              height={20}
              className="absolute right-4 top-3"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div className="col-span-2 flex justify-end mt-6 space-x-4">
            <button type="button" className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700">
              Cadastrar
              <Image src="/icons/plus-add-icon.svg" alt="Cadastrar" width={16} height={16} className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
