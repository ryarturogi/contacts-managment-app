import Sidebar from '@/components/layout/Sidebar'
import { AppDispatch, RootState } from '@/lib/store'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Drawer } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const drawerWidth = 300

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  children: React.ReactNode
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props
  const router = useRouter()
  const isDrawerOpen = useSelector((state: RootState) => state.drawer)
  const dispatch = useDispatch<AppDispatch>()

  const handleDrawerToggle = () => {
    dispatch({ type: 'TOGGLE_DRAWER' })
  }

  React.useEffect(() => {
    // close drawer on route change if is a different route
    if (isDrawerOpen) {
      handleDrawerToggle()
    }
  }, [router])

  const drawer: React.ReactNode = (
    <div>
      <Sidebar />
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <Box
        sx={{
          display: { sm: 'block', md: 'flex' },
          backgroundColor: '#f5f5f5',
        }}
        component='section'
      >
        <CssBaseline />
        <Box
          component='nav'
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label='mailbox folders'
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant='temporary'
            open={isDrawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { sm: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant='permanent'
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flex: '1 1 50%',
              background: '#fff',
              p: 1,
              borderRadius: { xs: '1rem 1rem 0 0', md: '1rem' },
              width: '100%',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '72rem',
                padding: '0 1rem',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <Link href='/'>
                <Image
                  src='/logo.png'
                  width={110}
                  height={70}
                  alt='logo'
                  title={`The Keeper's | Keeping the lights safe`}
                  priority={true}
                />
              </Link>

              <MenuIcon
                sx={{
                  display: { md: 'none' },
                  color: 'primary.main',
                  cursor: 'pointer',
                  mr: 1,
                  width: '35px',
                  height: '35px',
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  zIndex: 1,
                }}
                onClick={handleDrawerToggle}
              />
            </Box>
          </Box>

          <Box
            sx={{
              flex: '1 1 50%',
              px: { xs: 2, md: 3 },
              borderRadius: { xs: '0 0 1rem 1rem', md: '1rem' },
              width: '100%',
              maxWidth: { xs: '100%', md: '72rem' },
              position: 'relative',

              minHeight: '100vh',
            }}
          >
            {props.children}
          </Box>
        </Box>
      </Box>
    </>
  )
}
