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

export interface CostumerResponse {
  data: Costumer[];
  page: string | number;
  total: number;
  totalPages: number;
}