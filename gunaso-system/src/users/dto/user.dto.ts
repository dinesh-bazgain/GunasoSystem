import { Role } from "@prisma/client";

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: Role;
}

export class UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  fullName?: string;
  role?: string;
}