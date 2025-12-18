import { z } from "zod";

export const email = z.email("Invalid email format");
