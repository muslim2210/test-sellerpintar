export interface UserModel {
  id: number;
  name: string;
  role: "User" | "Admin";
}