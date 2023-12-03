import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  // Link,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  Route,
  BrowserRouter as Router,
  Link as RouterLink,
  Routes,
} from 'react-router-dom';

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

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      <Router>
        <AppBar color="default" position="static">
          <Container maxWidth="xl">
            <Toolbar>
              <Box
                sx={{
                  direction: 'row',
                  flexGrow: 1,
                }}
              >
                <RouterLink
                  to="/"
                  title="Home"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#689f38',
                  }}
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
                </RouterLink>
              </Box>

              <Box>
                <Button variant="contained" color="secondary">
                  <RouterLink
                    to="/signup"
                    title="Signup"
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    {t('signup.signup')}
                  </RouterLink>
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginLeft: 2 }}
                >
                  <RouterLink
                    to="/login"
                    title="Login"
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    {t('login')}
                  </RouterLink>
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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/user/:id" element={<UserPage />} />
            </Routes>

            <LanguageSelector />
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
