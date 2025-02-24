import axios from "axios";
import { AddCostumer, Costumer, CostumerResponse } from "../types/costumer";
import { formatQueryParams } from "../utils/queryFilter";

const baseUrl = process.env.NEXT_PUBLIC_APP_API + 'api/';

export async function getAllCostumersByFilter(filters: any): Promise<CostumerResponse> {
  let query = "";
  if (filters) {
    query = formatQueryParams(filters);
  }
  const url = baseUrl + `costumer/get-all-costumers-by-filter${query}`;

  return (await axios.get(url)).data;
}

export async function deleteSelectedCostumers(
  costumersIds: string[]
): Promise<void> {
  return await axios.delete(baseUrl + `costumer`, { data: {ids: costumersIds} });
}

export async function postAddCostumer(body: AddCostumer): Promise<void> {
  return await axios.post<void>(baseUrl + `costumer`, body, {
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.data);
}
