import { AppBar, Toolbar, IconButton, Typography, Box, Button, Link } from '@mui/material';
import Logo from '../logo/Logo';
import HeaderData from '../data/HeaderData';

export default function Header() {
  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Logo
            sx={{
              position: 'fixed',
              top: { xs: 16, sm: 24, md: 40 },
              left: { xs: 16, sm: 24, md: 40 },
            }}
          />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 3, display: { xs: 'none', sm: 'block' } }}
        >
          LaVie
        </Typography>
        <HeaderData />
      </Toolbar>
    </AppBar>
  )
}