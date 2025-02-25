export interface Costumer {
  id: string;
  name: string;
  phone: string;
  birth: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddCostumer {
  name: string;
  phone: string;
  birth: string;
  email: string;
  address: string;
}

export interface UpdateCostumer {
  name: string;
  phone: string;
  birth: string;
  email: string;
  address: string;
}

export interface CostumerResponse {
  data: Costumer[];
  page: string | number;
  total: number;
  totalPages: number;
}