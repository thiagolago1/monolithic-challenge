import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Costumer, CostumerResponse } from "../types/costumer";
import { getAllCostumersByFilter, getCostumerById } from "../services/costumerServices";

export const useCostumersByFilter = (
  filters: any
): UseQueryResult<CostumerResponse, Error> => {
  return useQuery({
    queryKey: ["concursos-by-filter", filters],
    queryFn: () => getAllCostumersByFilter(filters),
  });
};

export const useCostumersById = (
  idCostumer: string
): UseQueryResult<Costumer, Error> => {
  return useQuery({
    queryKey: ["concursos-by-id", idCostumer],
    queryFn: () => getCostumerById(idCostumer),
  });
};
