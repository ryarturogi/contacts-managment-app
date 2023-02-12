import { TablePagination } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import { useGetContactsListQuery } from '../../lib/contactsApi'
import ContactsTableHead from './ContactsTableHead'
import ContactsTableToolbar from './ContactsTableToolbar'
import { Data, Order } from './types'

export default function ContactsTable() {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('createdAt')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [rows, setRows] = React.useState<readonly Data[]>([])
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const { data, error, isLoading } = useGetContactsListQuery(
    {
      page,
      perPage: rowsPerPage,
      _sort: order,
      _orderBy: orderBy,
      // _contains: search
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    console.log('handleRequestSort', order, orderBy)
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  React.useEffect(() => {
    //  clear the rows array and add the new rows from the new page to the rows array, so that the table can be updated, rows are getting duplicated when changing pages and the table is not updating
    setRows([])

    if (data) {
      setRows(data.results)
    }
  }, [data])

  if (isLoading) {
    return <CircularProgress disableShrink color='primary' />
  }

  if (error) {
    return <div>Something went wrong</div>
  }

  return (
    <Box sx={{ width: '100%', marginTop: '20px' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <ContactsTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={'medium'}
          >
            <ContactsTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rowsPerPage}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `Contacts-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                    >
                      {row.id}
                    </TableCell>
                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                    >
                      {row.firstName}
                    </TableCell>
                    <TableCell align='left'>{row.lastName}</TableCell>
                    <TableCell align='left'>{row.email}</TableCell>
                    <TableCell align='left'>{row.phone}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={data.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10))
            setPage(0)
          }}
        />
      </Paper>
    </Box>
  )
}
