export interface UserModel {
  id: number;
  username: string;
  role: "User" | "Admin";
}