// Types
import type { User } from "@features/auth/types";

export interface Profile extends Omit<User, "password"> {
  userId: string;
  authorities: string[];
}

export type UpdateProfileDTO = Omit<
  Profile,
  "userId" | "username" | "authorities"
>;
export type Mode = "DEFAULT" | "UPDATE";
