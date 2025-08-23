// Types
import type { User } from "@features/auth/types";

export interface Profile extends Omit<User, "password"> {
  userId: string;
  authorities: string[];
}
