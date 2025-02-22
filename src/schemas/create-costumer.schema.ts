import { z } from 'zod';

export const createCostumerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  birth: z.coerce.date(),
  address: z.string()
})

export type CreateCostumerBodySchema = z.infer<typeof createCostumerBodySchema>