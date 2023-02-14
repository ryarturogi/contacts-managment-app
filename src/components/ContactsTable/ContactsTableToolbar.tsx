import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SearchIcon from '@mui/icons-material/Search'
import {
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
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        py: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant={'h4' /* variantMapping={{ sm: 'h1', xs: 'h2' }} */}
        id='tableTitle'
        component='h1'
        fontWeight={700}
      >
        Members
      </Typography>
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
          ml: 1,
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
        New Member
      </Button>
    </Toolbar>
  )
}

export default ContactsTableToolbar
