import { z } from 'zod';

export const updateCostumerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  birth: z.coerce.date(),
  address: z.string()
});

export type UpdateCostumerBodySchema = z.infer<typeof updateCostumerBodySchema>;
