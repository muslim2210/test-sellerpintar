import { CategoriModel } from "./categories"
import { UserModel } from "./users"

export interface ArticleModel {
  id: string
  title: string
  content: string
  imageUrl: string
  userId: string
  categoryId: string
  category: CategoriModel
  user: UserModel
  createdAt: string
  updatedAt: string
}