import { State } from "@prisma/client";
import { z } from "zod";

export const UpdateStateSchema = z.object({
  id: z.string(),
  state: z.nativeEnum(State),
});

export type UpdateState = z.infer<typeof UpdateStateSchema>;
