import { z } from "zod";

export const validatedJoinRoom = z.object({
  username: z
    .string()
    .min(2, "Username must contain at least 2 characters")
    .max(30, "Username must not contain more than 30 characters"),
  roomId: z.string().trim(),
});
