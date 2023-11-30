import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import HomePage from '@/pages/home/HomePage.tsx';
import LoginPage from '@/pages/login/LoginPage.tsx';
import SignupPage from '@/pages/signup/SignupPage.tsx';
import UserPage from '@/pages/user/UserPage.tsx';

import LanguageSelector from './components/LanguageSelector.tsx';

import './style.css';

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
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <div
        style={{
          width: '100%',
          backgroundColor: '#fafafa',
          height: '100vh',
        }}
      >
        {window.location.pathname === '/' && <HomePage />}
        {window.location.pathname === '/signup' && <SignupPage />}
        {window.location.pathname === '/login' && <LoginPage />}
        {window.location.pathname === '/user/1' && <UserPage />}
        <LanguageSelector />
      </div>
    </ThemeProvider>
  );
}

export default App;
