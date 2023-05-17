import { Role } from "./role";

export interface User {
  id: string;
  email: string;
  username: string;
  accessToken: string;
  roles: [Role];
}
