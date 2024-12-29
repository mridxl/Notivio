import { z } from 'zod';

export const parseZodError = (error: z.ZodError) => {
  const errorMsg = JSON.parse(error.message);
  return errorMsg[0].message.trim();
};
