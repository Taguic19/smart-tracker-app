import { createFactory } from "hono/factory";
import type { Env } from "@/types/env";

export const factory = createFactory<Env>();