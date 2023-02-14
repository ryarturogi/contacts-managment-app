import { Delete } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { IconButton, MenuItem } from '@mui/material'
import Menu, { MenuProps } from '@mui/material/Menu'
import { alpha, styled } from '@mui/material/styles'
import router from 'next/router'
import * as React from 'react'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

interface ActionsMenuProps {
  id: string
  onDelete?: any
  isSingle?: boolean
}

const ActionsMenu: React.FC<ActionsMenuProps> = (props: ActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }
  const handleAction = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()

    const action = e.currentTarget.textContent
    const contactId = props.id

    switch (action) {
      case 'Update': {
        const contactId = props.id
        if (!contactId) {
          break
        }
        const editRoute = `/contacts/edit/${contactId}`
        router.push(editRoute)
        break
      }
      case 'View':
        if (!contactId) {
          break
        }
        const viewRoute = `/contacts/${contactId}`
        router.push(viewRoute)
        break
      case 'Delete':
        if (!contactId) {
          break
        }
        if (props.onDelete) {
          props.onDelete(contactId)
        }
        break
      default:
        break
    }
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label='more'
        id={props.id}
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleOpenMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id='actions-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleAction}
      >
        {!props.isSingle && (
          <MenuItem onClick={handleAction} disableRipple>
            <VisibilityIcon />
            View
          </MenuItem>
        )}
        <MenuItem onClick={handleAction} disableRipple>
          <EditIcon />
          Update
        </MenuItem>
        <MenuItem onClick={handleAction} disableRipple>
          <Delete />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  )
}

export default ActionsMenu
