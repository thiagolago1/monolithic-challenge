import { z } from "zod";

export const addCostumerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(11, "Telefone deve ter 11 caracteres")
    .max(11, "Telefone deve ter 11 caracteres"),
  birth: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Data de nascimento inválida",
    }),
  address: z.string().min(10, "Endereço é obrigatório"),
});