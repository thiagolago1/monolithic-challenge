import { deleteSelectedCostumers } from "@/services/costumerServices";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCostumers = () => {
  return useMutation({ mutationFn: deleteSelectedCostumers });
};