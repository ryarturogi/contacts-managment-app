export type Order = 'asc' | 'desc'

export interface Data {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

export interface ContactsTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

export interface ContactsTableToolbarProps {
  numSelected: number
}
