import {
    Box, Container, CSSObject, Divider, Drawer as MuiDrawer, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, styled, Theme, Toolbar, Typography
  } from '@mui/material'
  import CompletedIcon from '@mui/icons-material/WorkHistory'
  import HomeIcon from '@mui/icons-material/Home'
  import LogoIcon from '@mui/icons-material/Checklist'
  import PendingIcon from '@mui/icons-material/Work'
  import PeopleIcon from '@mui/icons-material/PeopleAlt'
  
  import { ComponentType, forwardRef, ForwardRefRenderFunction, useState } from 'react'
  import { Link } from "react-router-dom"
  
  const drawerWidth = 220
  
  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  })
  
  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  })
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  )
  
  export default function useAppNavigation<P extends object>(
    WrappedComponent: ComponentType<P>
  ) {
    const AppNavigation: ForwardRefRenderFunction<unknown, P> = (props, ref) => {
      const [open, setOpen] = useState(true)
        
      const toggleDrawer = () => {
        setOpen(!open)
      }
  
      return (
        <Box sx={{ display: 'flex' }}>
          <Drawer
            open={open}
            variant="permanent"
            anchor="left"
          >
            <Toolbar onClick={toggleDrawer}>
              {open ?
                <Typography variant="body1" fontWeight={600} color={'primary'}>CHECKLIST APP</Typography> :
                <LogoIcon color={'primary'} />
              }
            </Toolbar>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/pending">
                  <ListItemIcon>
                    <PendingIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Pending"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/completed">
                  <ListItemIcon>
                    <CompletedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Completed"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/team">
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Team"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            <Container maxWidth="md">
              <WrappedComponent
                {...props}
                ref={ref}
              />
            </Container>
          </Box>
        </Box>
      )
    }
  
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'
    AppNavigation.displayName = `AppNavigation(${displayName})`
  
    return forwardRef(AppNavigation)
  }