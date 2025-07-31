import { CategoriModel } from "./categories"
import { UserModel } from "./users"

export interface ArticleModel {
  id: number
  title: string
  content: string
  userId: number
  category: CategoriModel
  user: UserModel
  createdAt: string
  updatedAt: string
}