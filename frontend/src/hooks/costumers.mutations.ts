import { deleteSelectedCostumers, postAddCostumer, putUpdateCostumer } from "@/services/costumerServices";
import { UpdateCostumer } from "@/types/costumer";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCostumers = () => {
  return useMutation({ mutationFn: deleteSelectedCostumers });
};

export const useAddCostumer = () => {
  return useMutation({
    mutationFn: postAddCostumer,
  });
};

export const useUpdateCostumer = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateCostumer }) => putUpdateCostumer(body, id),
  });
};
