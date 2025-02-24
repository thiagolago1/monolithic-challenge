import { deleteSelectedCostumers, postAddCostumer } from "@/services/costumerServices";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCostumers = () => {
  return useMutation({ mutationFn: deleteSelectedCostumers });
};

export const useAddCostumer = () => {
  return useMutation({
    mutationFn: postAddCostumer,
  });
};
