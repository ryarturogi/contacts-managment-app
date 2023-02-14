export type Order = 'asc' | 'desc'

export interface IOptions {
  [key: string]: string
}

export interface Data {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
  options: IOptions
}

export interface IHeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

export interface ContactsTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  order: Order
  orderBy: string
  rowCount: number
}
