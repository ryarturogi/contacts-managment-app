import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useRouter } from 'next/router'

interface Props {
  text: string
  path: string
  icon: React.ReactNode
}

const SidebarItem = ({ text, path, icon }: Props) => {
  const router = useRouter()
  const isActive = router.pathname === path

  return (
    <ListItem component='div' disablePadding sx={{}}>
      <ListItemButton
        sx={{
          height: 56,
          background: isActive ? 'rgba(27, 89, 248, 0.1)' : '#fff',
          borderRadius: '.75rem',
        }}
        onClick={() => router.push(path)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            color: isActive ? 'primary' : 'action',
            fontWeight: 'bolder',
            variant: 'body1',
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default SidebarItem
