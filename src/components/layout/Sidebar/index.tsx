import AddBoxIcon from '@mui/icons-material/AddBox'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import DatasetLinkedTwoToneIcon from '@mui/icons-material/DatasetLinkedTwoTone'
import DeviceHubTwoToneIcon from '@mui/icons-material/DeviceHubTwoTone'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'
import SidebarItem from './SidebarItem'

const data = [
  {
    icon: <AttachFileIcon />,
    label: 'MyResume',
    url: 'https://github.com/ryarturogi/ryarturogi/files/10681803/Ricardo_Guillen_FE_Resume_2023.pdf',
  },
  {
    icon: <DatasetLinkedTwoToneIcon />,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ryarturogi/',
  },
  {
    icon: <DeviceHubTwoToneIcon />,
    label: 'Github',
    url: 'https://github.com/ryarturogi',
  },
  {
    icon: <SendTwoToneIcon />,
    label: 'Email',
    url: 'mailto:r.arturogi@gmail.com',
  },
]

const ContactsNavbar = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
})

const Sidebar: React.FC = () => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  return (
    <Box sx={{ display: 'flex' }}>
      <Paper
        elevation={0}
        sx={{ maxWidth: 300, overflow: 'hidden', borderRadius: 0 }}
      >
        <ContactsNavbar
          component='nav'
          disablePadding
          sx={{
            width: { sm: 280 },
            flexShrink: { sm: 0 },
            height: '100vh',
          }}
          aria-label='contacts navigation'
        >
          <Box
            component='a'
            onClick={() => router.push('/')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              pb: 0.5,
              gap: 0.25,
              background: '#fff',
              width: 'fit-content',
              borderRadius: '1rem',
              margin: '0 auto',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <Image
              src='/logo.png'
              width={180}
              height={110}
              alt='logo'
              title={`The Keeper's | Keeping the lights safe`}
              priority={true}
            />
            <ListItemText
              primary='Keeping the lights safe'
              primaryTypographyProps={{
                color: 'action',
                fontWeight: 'bold',
                variant: 'body1',
              }}
            />
          </Box>
          <Divider sx={{ my: 1, margin: '1rem auto' }} />
          <List
            sx={{
              px: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <SidebarItem
              text="Keeper's Book"
              path='/'
              icon={
                <RecentActorsIcon
                  sx={{
                    color: router.pathname === '/' ? '#1B59F8' : '',
                  }}
                />
              }
            />
            <SidebarItem
              text='Create Keeper'
              path='/contacts/new'
              icon={
                <AddBoxIcon
                  sx={{
                    color: router.pathname === '/contacts/new' ? '#1B59F8' : '',
                  }}
                />
              }
            />
          </List>
          <Divider />
          <Box
            sx={{
              bgcolor: open ? '#fff' : null,
              pb: open ? 2 : 0,
            }}
          >
            <ListItemButton
              alignItems='flex-start'
              onClick={() => setOpen(!open)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: 2.5,
                '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0.5 } },
              }}
            >
              <ListItemText
                primary={`Developer's Info`}
                primaryTypographyProps={{
                  fontSize: 15,
                  lineHeight: '20px',
                  mb: '2px',
                  fontWeight: 'bold',
                  color: open ? '#1B59F8' : 'text.disabled',
                }}
                secondary='Contact, Resume, Github, LinkedIn'
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: '16px',
                  color: open ? 'text.primary' : 'text.disabled',
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0.2,
                  transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                  transition: '0.2s',
                }}
              />
            </ListItemButton>
            {open &&
              data.map((item) => (
                <ListItemButton
                  key={item.label}
                  sx={{ py: 1, minHeight: 32, color: '#222' }}
                  onClick={() => window.open(item.url, '_blank')}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 'semibold',
                    }}
                  />
                </ListItemButton>
              ))}
          </Box>
        </ContactsNavbar>
      </Paper>
    </Box>
  )
}

export default Sidebar
