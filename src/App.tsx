import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import logo from '@/assets/b27_logo.jpeg';
import LanguageSelector from '@/components/LanguageSelector.tsx';
import HomePage from '@/pages/home/HomePage.tsx';
import LoginPage from '@/pages/login/LoginPage.tsx';
import SignupPage from '@/pages/signup/SignupPage.tsx';
import UserPage from '@/pages/user/UserPage.tsx';
import '@/style.css';
// import { testLog } from '@/utils/debugLogger.ts';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#689f38',
      light: '#9ccc65',
      dark: '#558b2f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0288d1',
      light: '##29b6f6',
      dark: '#0277bd',
      contrastText: '#fff',
    },
  },
});

function App() {
  const { t } = useTranslation();

  const [path, setPath] = useState(window.location.pathname);

  // function onClickLink(event: MouseEvent<HTMLAnchorElement>) {
  const onClickLink = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const { currentTarget } = event;
    const linkPath = (currentTarget as HTMLAnchorElement).pathname;
    window.history.pushState({}, '', linkPath);
    setPath(linkPath);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      <AppBar
        color="default"
        position="static"
        // sx={{ backgroundColor: 'primary.light' }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ direction: 'row', flexGrow: 1 }}>
              <Link
                href="/"
                onClick={onClickLink}
                title="Home"
                display="flex"
                alignItems="center"
                underline="none"
              >
                <Avatar
                  src={logo}
                  alt="Logo"
                  sx={{ display: 'inline-flex', marginRight: '1rem' }}
                />
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('app.name')}
                </Typography>
              </Link>
            </Box>

            <Box>
              <Button variant="contained" color="secondary">
                <Link
                  href="/signup"
                  onClick={onClickLink}
                  title="Signup"
                  underline="none"
                  color="white"
                >
                  {t('signup.signup')}
                </Link>
              </Button>
              {/* <Button variant="contained"> */}
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginLeft: 2 }}
              >
                <Link
                  href="/login"
                  onClick={onClickLink}
                  title="Login"
                  sx={{ color: 'white' }}
                >
                  {t('login')}
                </Link>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <div
        style={{
          width: '100%',
          backgroundColor: '#fafafa',
          height: '100vh',
        }}
      >
        <Container maxWidth="xl">
          {path === '/' && <HomePage />}
          {path === '/signup' && <SignupPage />}
          {path === '/login' && <LoginPage />}
          {path.startsWith('/user') && <UserPage />}

          <LanguageSelector />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
