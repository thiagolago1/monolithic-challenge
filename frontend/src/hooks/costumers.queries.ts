import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CostumerResponse } from "../types/costumer";
import { getAllCostumersByFilter } from "../services/costumerServices";

export const useCostumersByFilter = (
  filters: any
): UseQueryResult<CostumerResponse, Error> => {
  return useQuery({
    queryKey: ["concursos-by-filter", filters],
    queryFn: () => getAllCostumersByFilter(filters),
  });
};
