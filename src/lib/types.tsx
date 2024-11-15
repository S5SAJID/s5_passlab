export type UserInfo = {
  firstName: string
  lastName: string
  favNumber: string
  separator: string
}

export type FormulaItem = {
  id: string
  content: string
}

export type Formula = FormulaItem[]

export type FormulaSet = {
  [email: string]: Formula
}

export type StoredPassword = {
  website: string
  category: string
  password: string
}

export const categories = [
  'Social',
  'Email',
  'Banking',
  'Shopping',
  'Entertainment',
  'Work',
  'Other'
]


export const defaultFormulaItems: FormulaItem[] = [
  { id: 'fl', content: 'First Letter of First Name' },
  { id: 'website', content: 'Website Name' },
  { id: 'category', content: 'Category' },
  { id: 'separator', content: 'Separator' },
  { id: 'firstname', content: 'First Name' },
  { id: 'favnumber', content: 'Favorite Number' },
]