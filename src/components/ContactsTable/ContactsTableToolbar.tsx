import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'

interface ContactsTableToolbarProps {
  onSearch: (search: string) => void
}

const ContactsTableToolbar: React.FC<ContactsTableToolbarProps> = (
  props: ContactsTableToolbarProps
) => {
  const router = useRouter()
  const { onSearch } = props

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }, 500)

  return (
    <>
      <Toolbar
        sx={{
          mt: 2,
          mb: { xs: 3, md: 1 },
          gap: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          minHeight: { xs: 'auto', md: '50px' },
          // pt: { xs: 2, md: 0 },
        }}
      >
        <Box sx={{ display: 'flex', flex: '1', alignItems: 'center' }}>
          <Typography
            id='tableTitle'
            component='h1'
            fontWeight={700}
            sx={{
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              color: 'primary.primary',
              display: { xs: 'none', md: 'block' },
            }}
          >
            Members
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, sm: 2 },
            width: '100%',
            flex: '1 1 40%',
          }}
        >
          <TextField
            id='search'
            label='Search'
            variant='outlined'
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon color='primary' />
                </InputAdornment>
              ),
              placeholder: 'e.g. email@example.com',
            }}
            sx={{ width: '100%', maxWith: '400px', background: '#fff' }}
            onChange={handleSearch}
          />
          <Button
            aria-label='new member'
            sx={{
              background: '#fff',
              maxWidth: 'fit-content',
              py: 0.85,
              display: 'flex',
              gap: 1,

              borderRadius: '0.30rem',
              border: '1px solid #ccc',
              '&:hover': {
                background: '#fff',
                border: '1px solid #222',
              },
            }}
            onClick={() => router.push('/contacts/new')}
            title='New Member'
            variant='outlined'
            fullWidth
          >
            <AddCircleOutlineIcon color='primary' />
            <Typography
              variant='body2'
              fontWeight={600}
              sx={{ display: { xs: 'none', lg: 'block' } }}
            >
              New Member
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </>
  )
}

export default ContactsTableToolbar
