import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

  function onClickLink(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const { target } = event;
    const linkPath = (target as HTMLAnchorElement).pathname;
    window.history.pushState({}, '', linkPath);
    setPath(linkPath);
  }

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
        <div>
          <a href="/" onClick={onClickLink} title="Home">
            B27 Projects
          </a>
          <a href="/signup" onClick={onClickLink} title="Signup">
            {t('signup.signup')}
          </a>
          <a href="/login" onClick={onClickLink} title="Login">
            Login
          </a>
        </div>
        {path === '/' && <HomePage />}
        {path === '/signup' && <SignupPage />}
        {path === '/login' && <LoginPage />}
        {path.startsWith('/user') && <UserPage />}
        <LanguageSelector />
      </div>
    </ThemeProvider>
  );
}

export default App;
