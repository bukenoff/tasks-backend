import { User } from "../user.entity";

export interface JwtPayload {
  name: User['name'];
}