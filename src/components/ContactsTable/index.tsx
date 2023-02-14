import ContactsTableHead from '@/components/ContactsTable/ContactsTableHead'
import ContactsTableToolbar from '@/components/ContactsTable/ContactsTableToolbar'
import ActionsMenu from '@/components/UI/ActionsMenu'
import {
  useDeleteContactMutation,
  useGetContactsListQuery,
} from '@/lib/contactsApi'
import { Data, Order } from '@/types'
import { Cancel, Delete, Error, Group } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'

import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ContactsTable: FC = () => {
  const router = useRouter()
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('updatedAt')
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState<readonly Data[]>([])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState<string>('')
  const [isRefetching, setIsSleep] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [cachedId, setCachedId] = useState<string | undefined>(undefined)

  const [deleteContact] = useDeleteContactMutation()
  const { data, error, isLoading, isFetching, refetch } =
    useGetContactsListQuery(
      {
        page,
        perPage: rowsPerPage,
        _sort: order,
        _orderBy: orderBy,
        _contains: search || undefined,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    )

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleOnSearch = (search: string) => {
    setSearch(search)
  }

  const handleDelete = async (id?: string) => {
    // validate if user wants to delete
    if (!confirmDelete) {
      setConfirmDelete(true)
      // cache the id to delete
      setCachedId(id)
      return
    }
    // if user wants to delete, delete contact
    const res = await deleteContact({ id: cachedId || id })

    if (res?.data?._id) {
      router.push('/').then(() => {
        toast('Contact deleted successfully', {
          type: 'success',
        })
      })
    }

    // if Error, show error message
    toast(res?.error?.data?.message, {
      type: 'error',
    })
    setConfirmDelete(false)
    setCachedId(undefined)
    refetch()
  }

  const isEmpty: Boolean = data?.results?.length === 0

  useEffect(() => {
    if (data) {
      setRows(data.results)
    }
  }, [data])

  useEffect(() => {
    if (isFetching) {
      setIsSleep(true)
    } else {
      setTimeout(() => {
        setIsSleep(false)
      }, 200)
    }
  }, [isFetching])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        sx={{
          width: '100%',
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
        }}
      >
        <Error
          sx={{ fontSize: 100, color: 'grey.500', marginBottom: '20px' }}
        />
        <Typography variant='h6' component='div' gutterBottom fontWeight='bold'>
          Something went wrong, please try again later
        </Typography>
        <Button
          variant='text'
          color='info'
          size='large'
          sx={{
            marginTop: '',
            fontWeight: 'bold',
            textTransform: 'capitalize',
            fontSize: '1.15rem',
          }}
          onClick={() => router.reload()}
        >
          Reload page
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ width: '100%', marginTop: '20px', maxWidth: '120ch' }}>
        <ContactsTableToolbar onSearch={handleOnSearch} />
        <Divider sx={{ marginBottom: '1rem' }} />
        <Paper
          sx={{
            width: '100%',
            mb: 2,
            borderRadius: '1rem',
            height: '100%',
            maxHeight: 'calc(100vh - 160px)',
            overflow: 'auto',
          }}
        >
          <TableContainer>
            <Table
              aria-labelledby='tableTitle'
              size={'medium'}
              sx={{ position: 'relative' }}
            >
              <ContactsTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rowsPerPage}
              />

              <TableBody>
                {isRefetching && (
                  <Box
                    sx={{
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}

                {!isEmpty ? (
                  rows.map((row, idx) => {
                    return (
                      <TableRow
                        role='row'
                        key={row.id}
                        hover
                        onClick={() => router.push(`/contacts/${row.id}`)}
                        sx={{
                          cursor: 'pointer',
                          '&:last-child td, &:last-child th': {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell
                          component='th'
                          align='left'
                          sx={{
                            pl: '2rem',
                          }}
                        >
                          {row.firstName}
                        </TableCell>
                        <TableCell component='th' align='left'>
                          {row.lastName}
                        </TableCell>
                        <TableCell component='th' align='left'>
                          {row.email}
                        </TableCell>
                        <TableCell component='th' align='left'>
                          {row.phone}
                        </TableCell>
                        <TableCell component='th' align='center'>
                          <ActionsMenu
                            id={row.id}
                            onDelete={() => handleDelete(row.id)}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align='center' sx={{ py: 3 }}>
                      <Group sx={{ fontSize: 100, color: 'grey.500' }} />
                      <Typography
                        variant='h6'
                        component='div'
                        gutterBottom
                        fontWeight='bold'
                      >
                        No contacts found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={data?.count || rows.length}
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

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Card
            variant='elevation'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1rem',
              width: '300px',
              height: '200px',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '0.5rem',
            }}
          >
            <Typography variant='h5' color='inherit' fontWeight={600}>
              Are you sure?
            </Typography>
            <Typography variant='body1' color='inherit'>
              This action cannot be undone.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                gap: '0.5rem',
              }}
            >
              <Button
                variant='contained'
                color='error'
                fullWidth
                size='large'
                onClick={() => handleDelete()}
              >
                <Delete />
                <Typography
                  variant='button'
                  color='inherit'
                  fontWeight={600}
                  fontSize='1.15rem'
                  sx={{ textTransform: 'capitalize' }}
                >
                  Delete
                </Typography>
              </Button>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                size='large'
                onClick={() => setConfirmDelete(false)}
                sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Cancel />
                <Typography
                  variant='button'
                  color='inherit'
                  fontWeight={600}
                  fontSize='1.15rem'
                  sx={{ textTransform: 'capitalize' }}
                >
                  Cancel
                </Typography>
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal>
    </>
  )
}

export default ContactsTable
