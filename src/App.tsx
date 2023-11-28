import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';

import SignupPage from '@/pages/signup/SignupPage.tsx';

import LanguageSelector from './components/LanguageSelector.tsx';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

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

// const useStyles = makeStyles({
//   page: {
//     width: '100%',
//     backgroundColor: '#ccc',
//   },
// });

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <div
        style={{
          width: '100%',
          backgroundColor: '#fafafa',
          height: '100vh',
          // paddingTop: '50px',
        }}
      >
        {/* <Container> */}
        <SignupPage />
        <LanguageSelector />
        {/* </Container> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
