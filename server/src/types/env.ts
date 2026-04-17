import type { TokenPayload } from "./token-types";

export type Env = {
  Bindings: {
    JWT_ACCESS_KEY: string;
    JWT_REFRESH_KEY: string;
    PORT: string;
  }
  Variables: {
    user: TokenPayload
  }
};