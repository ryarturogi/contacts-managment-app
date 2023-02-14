import ActionsMenu from '@/components/UI/ActionsMenu'
import {
  useDeleteContactMutation,
  useGetContactDetailsQuery,
} from '@/lib/contactsApi'
import { Cancel, Delete, Home } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CircularProgress,
  Container,
  IconButton,
  Modal,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ContactDetails: React.FC = () => {
  const router = useRouter()
  const { contactId } = router.query

  const { data, isLoading, error } = useGetContactDetailsQuery(
    {
      id: contactId,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !contactId,
    }
  )
  const [deleteContact] = useDeleteContactMutation()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async () => {
    // validate if user wants to delete
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    // if user wants to delete, delete contact
    const res = await deleteContact({ id: contactId })
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
  }

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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant='h4' color='error'>
          {error?.data?.message}
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Head>
        <title>The Keeper's Book | Contact Details</title>
        <meta name='description' content='Contact Details' />
      </Head>
      <Container
        sx={{
          padding: '0 1.25rem 1.25rem',
          display: 'flex',
          gap: '0.5rem',
          flexDirection: 'column',
          margin: 0,
        }}
      >
        <Box
          sx={{
            padding: '1rem',
            paddingLeft: '0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'background.paper',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              maxWidth: '60ch',
            }}
          >
            <Breadcrumbs aria-label='breadcrumb'>
              <IconButton onClick={() => router.push('/')}>
                <Home />
              </IconButton>
              <Typography color='text.primary'>Contact's Detail</Typography>
              <Typography
                variant='body1'
                fontWeight={600}
                sx={{ textTransform: 'capitalize', color: 'primary.main' }}
              >
                {data?.firstName} {data?.lastName}
              </Typography>
            </Breadcrumbs>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: 'background.paper',
            padding: '1rem',
            borderRadius: '0.75rem',
            maxWidth: '60ch',
          }}
          component='section'
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              gap: '2rem',
              alignItems: 'start',
            }}
            component='header'
          >
            <Avatar sx={{ width: '100px', height: '100px' }}>
              {data?.firstName[0]}
            </Avatar>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}
              component='section'
            >
              <Typography variant='h6' color='inherit'>
                <strong>
                  {data?.firstName} {data?.lastName}
                </strong>
              </Typography>
              <Box>
                <Typography
                  variant='body1'
                  color='inherit'
                  fontWeight={500}
                  mb={0.5}
                >
                  {data?.email.toLowerCase()}
                </Typography>
                <Typography variant='body2' color='inherit'>
                  {data?.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                ml: 'auto',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <ActionsMenu id={data?._id} onDelete={handleDelete} isSingle />
            </Box>
          </Box>
        </Box>
      </Container>

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
                onClick={handleDelete}
                sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
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

export default ContactDetails
