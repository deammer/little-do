export type Todo = {
  label: string
  id: string
  checked: boolean
  category: Category
  createdAt: number
  updatedAt: number
}

export enum Category {
  Today = "TODAY",
  Tomorrow = "TOMORROW",
}
