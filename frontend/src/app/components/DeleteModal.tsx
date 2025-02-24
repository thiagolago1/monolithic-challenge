"use client"

import React from "react";
import Image from 'next/image';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  costumerNames: string[];
}

const DeleteModal = ({ isOpen, onClose, onDelete, costumerNames }: DeleteModalProps) => {
  if (!isOpen) return null;

  const isMultiple = costumerNames.length > 1;
  const costumerText = isMultiple
    ? "os clientes"
    : `o cliente ${costumerNames[0]}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            <span className="text-red-600 font-bold">CUIDADO:</span> <span className="text-black font-bold">Você está prestes a excluir {isMultiple ? "vários clientes" : "um cliente"}!</span>
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          Tem certeza de que deseja excluir permanentemente {costumerText}? Esta ação não pode ser desfeita e todos os dados
          relacionados, incluindo histórico de empréstimos e faturas, serão removidos permanentemente.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-white bg-red-600 rounded-md flex items-center gap-2 hover:bg-red-700"
          >
            <Image src="/icons/trash-icon.svg" alt="Trash Icon" width={16} height={16} />
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
