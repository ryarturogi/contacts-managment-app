import ActionsMenu from '@/components/UI/ActionsMenu'
import {
  useDeleteContactMutation,
  useGetContactDetailsQuery,
} from '@/lib/contactsApi'
import { Cancel, Delete } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
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
          gap: '0.5rem',
          margin: '2rem 0 0 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
          component='section'
        >
          <Box
            sx={{
              display: { xs: 'block', sm: 'flex', md: 'flex' },
              justifyContent: 'start',
              gap: '2rem',
              alignItems: 'start',
              backgroundColor: 'background.paper',
              padding: '1rem',
              borderRadius: '0.75rem',
              maxWidth: '500px',
              position: 'relative',
            }}
            component='section'
          >
            <Avatar
              sx={{
                width: { xs: '50px', sm: '80px', md: '100px' },
                height: { xs: '50px', sm: '80px', md: '100px' },
                fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' },
                mb: { xs: '1rem', sm: '0', md: '0' },
              }}
            >
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
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
              }}
            >
              <ActionsMenu id={data?._id} onDelete={handleDelete} isSingle />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              flexDirection: 'column',
              gap: '2rem',
              alignItems: 'start',
              backgroundColor: 'background.paper',
              padding: '1.25rem 2rem',
              borderRadius: '0.75rem',
              maxWidth: '500px',
            }}
            component='section'
          >
            <Box
              sx={{
                display: { xs: 'block', sm: 'flex', md: 'flex' },
                gap: '2rem',
                alignItems: 'center',
              }}
              component='section'
            >
              <Typography variant='h6' color='inherit'>
                <strong>Country</strong>
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Typography variant='body1' color='inherit'>
                  Dominican Republic
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'block', sm: 'flex', md: 'flex' },
                gap: '2rem',
              }}
              component='section'
            >
              <Typography variant='h6' color='inherit'>
                <strong>Address</strong>
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  width: '100%',
                }}
              >
                <Typography variant='body1' color='inherit'>
                  Sample Address 1
                </Typography>
                <Typography variant='body1' color='inherit'>
                  Sample Address 2
                </Typography>
              </Box>
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
