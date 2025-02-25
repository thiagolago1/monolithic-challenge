"use client";

import { useCostumersByFilter } from "@/hooks/costumers.queries";
import { useCallback, useEffect, useState } from "react";
import Image from 'next/image';
import { formatDate } from "@/utils/formateDate";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { Costumer } from "@/types/costumer";
import { useRouter } from "next/navigation";
import { useDeleteCostumers } from "@/hooks/costumers.mutations";
import DeleteModal from "../components/DeleteModal";

export default function ClientesPage() {
  const router = useRouter();
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [dataGridFilters, setDataGridFilters] = useState({
    limit: 5,
    page: 1,
    search: "",
  });
  const costumersQuery = useCostumersByFilter(dataGridFilters);
  const deleteCostumers = useDeleteCostumers();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [customersToDelete, setCustomersToDelete] = useState<string[]>([]);

  const updateDataGridFilters = useCallback(() => {
    if (costumersQuery.data) {
      setTotalItems(costumersQuery.data.total);
      setTotalPages(costumersQuery.data.totalPages);
    }
  }, [costumersQuery.data]);

  useEffect(() => {
    updateDataGridFilters();
  }, [updateDataGridFilters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setDataGridFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const toggleSelect = (id: string) => {
    if (id === "all") {
      if (selected.length === costumersQuery.data?.data.length) {
        setSelected([]);
      } else {
        setSelected(costumersQuery.data?.data.map((customer: Costumer) => customer.id) || []);
      }
    } else {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setDataGridFilters((prev) => ({
      ...prev,
      page: direction === "next" ? prev.page + 1 : prev.page - 1,
    }));
  };

  const toggleMenu = (id: string) => {
    setMenuOpen((prev) => (prev === id ? null : id));
  };

  const handleDeleteCostumer = useCallback(
    async (costumersIds: string[]) => {
      try {
        await deleteCostumers.mutateAsync(costumersIds);
        setOpenDeleteModal(false);
        costumersQuery.refetch();
        setCustomersToDelete([]);
      } catch (error: unknown) {
        setOpenDeleteModal(false);
        console.log("error handleDeleteCostumer", error)
      }
    },
    [deleteCostumers, costumersQuery]
  );

  const handleOpenDeleteModal = () => {
    if (!costumersQuery.data?.data) return;

    const customerNames = costumersQuery.data.data
      .filter(customer => selected.includes(customer.id))
      .map(customer => customer.name);

    setCustomersToDelete(customerNames);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <h1 className="mb-4 text-black text-[32px]">Clientes</h1>
      <div className="bg-zinc-900 text-white p-6 rounded-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 bg-zinc-800 p-2 rounded-lg w-full max-w-md">
            <input
              type="text"
              placeholder="Pesquise por nome ou email"
              className="bg-transparent text-white w-full outline-none p-1"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onBlur={handleSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setDataGridFilters((prev) => ({ ...prev, search: searchText, page: 1 }))
                }
              }}
            />
            <Image src="/icons/search-icon.svg" alt="Search Icon" width={24} height={24} />
          </div>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
            disabled={selected.length === 0}
            onClick={handleOpenDeleteModal}
          >
            <Image src="/icons/trash-icon.svg" alt="Trash Icon" width={16} height={16} />
            <span>Excluir Selecionados</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-zinc-800">
                <th className="p-2">
                <input
                  type="checkbox"
                  checked={selected.length > 0 && selected.length === costumersQuery.data?.data.length}
                  onChange={() => toggleSelect("all")}
                />
                </th>
                <th className="text-left p-2">Nome</th>
                <th className="text-left p-2">E-mail</th>
                <th className="text-left p-2">Telefone</th>
                <th className="text-left p-2">Nascimento</th>
                <th className="text-left p-2">Endereço</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {costumersQuery.data?.data.map((customer: Costumer) => (
                <tr
                  key={customer.id}
                  className={`border-b border-zinc-700 ${selected.includes(customer.id) ? "bg-zinc-700" : ""}`}
                >
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(customer.id)}
                      onChange={() => toggleSelect(customer.id)}
                    />
                  </td>
                  <td className="p-2">{customer.name}</td>
                  <td className="p-2">{customer.email}</td>
                  <td className="p-2">{formatPhoneNumber(customer.phone)}</td>
                  <td className="p-2">{formatDate(customer.birth)}</td>
                  <td className="p-2">{customer.address}</td>
                  <td className="p-2 relative">
                    <button onClick={() => toggleMenu(customer.id)} className="p-2">
                      ...
                    </button>
                    {menuOpen === customer.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white text-black shadow-lg rounded-lg">
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg"
                          onClick={() => router.push(`/clientes/${customer.id}`)}
                        >
                          Editar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-400 text-sm">
            {selected.length} de {costumersQuery.data?.data.length} linhas selecionadas
          </span>

          <div className="flex items-center space-x-4">
            <button
              className="bg-zinc-700 px-4 py-2 rounded-lg text-gray-400 disabled:opacity-50"
              disabled={dataGridFilters.page <= 1}
              onClick={() => handlePageChange("prev")}
            >
              Anterior
            </button>
            <span className="text-gray-400">
              Página {dataGridFilters.page} de {totalPages} - Total Items: ({totalItems})
            </span>
            <button
              className="bg-zinc-700 px-4 py-2 rounded-lg text-gray-400 disabled:opacity-50"
              disabled={dataGridFilters.page >= totalPages}
              onClick={() => handlePageChange("next")}
            >
              Próxima
            </button>
          </div>
        </div>

      </div>

      <DeleteModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => handleDeleteCostumer(selected)}
        costumerNames={customersToDelete}
      />
    </>
  );
}
