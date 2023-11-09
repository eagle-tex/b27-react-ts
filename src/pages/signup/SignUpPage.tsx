/* eslint-disable @typescript-eslint/no-unused-vars */
// import CircularProgress from '@mui/material/CircularProgress';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { Body } from '@/api/apiCalls.ts';
import Axios from '@/api/axiosConfig.ts';

// import { postUser } from '@/api/apiCalls.ts';

// type Props = {}

type SignupState = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  apiProgress: boolean;
  signupSuccess: boolean;
};

function SignUpPage(/* {}: Props */) {
  const [state, setState] = useState<SignupState>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    apiProgress: false,
    signupSuccess: false,
  });

  const postUser = (body: Body) => {
    Axios.post('/api/v1/users', body)
      .then((response) => {
        setState((prevState) => {
          return { ...prevState, signupSuccess: true };
        });

        return response.data as Body;
      })
      .catch((err) => console.log(err));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  const submit = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { email, password, username } = state;
    const body = { username, email, password };
    setState((prevState) => {
      return { ...prevState, apiProgress: true };
    });
    try {
      postUser(body);
      // setState((prevState) => {
      //   return { ...prevState, signupSuccess: true };
      // });
      // console.log({ where: 'in submit, after postUser call', state });
    } catch (err) {
      console.log({ where: 'CATCH BLOCK', err });
      throw err;
    }
  };

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  // function isDisabled() {
  const { password, passwordRepeat } = state;
  // const { apiProgress, signupSuccess } = state;
  let disabled = true;
  if (password && passwordRepeat) {
    disabled = password !== passwordRepeat; // || apiProgress;
  }
  // return disabled;
  // }

  const { apiProgress, signupSuccess } = state;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
      px={4}
      my={6}
    >
      <Box
        p={4}
        minWidth="400px"
        maxWidth="500px"
        sx={{
          border: 1,
          borderColor: '#aaaccc',
          borderWidth: 1,
          borderRadius: 2,
        }}
      >
        {!signupSuccess && (
          <form data-testid="form-signup">
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Typography
                component="h1"
                variant="h4"
                mb={2}
                textAlign="center"
                color="green"
              >
                Créer un compte
              </Typography>

              <TextField
                id="username"
                label="Identifiant"
                placeholder="Identifiant"
                variant="outlined"
                name="username"
                type="text"
                fullWidth
                onChange={onChange}
              />
              <TextField
                id="email"
                label="Email"
                placeholder="votre@email.com"
                variant="outlined"
                name="email"
                type="email"
                fullWidth
                onChange={onChange}
              />
              <TextField
                id="password"
                label="Mot de passe"
                placeholder="••••••••"
                variant="outlined"
                name="password"
                type="password"
                fullWidth
                onChange={onChange}
              />
              <TextField
                id="passwordRepeat"
                label="Confirmer mot de passe"
                placeholder="••••••••"
                variant="outlined"
                name="passwordRepeat"
                type="password"
                fullWidth
                onChange={onChange}
              />

              <Button
                color="primary"
                size="large"
                variant="contained"
                // fullWidth
                // disabled={isDisabled() || apiProgress}
                disabled={disabled || apiProgress}
                type="submit"
                onClick={submit}
              >
                {apiProgress && (
                  <span role="status" style={{ marginRight: '1rem' }}>
                    <CircularProgress size={16} />{' '}
                  </span>
                )}
                Créer un compte
              </Button>
            </Stack>
          </form>
        )}
      </Box>

      {signupSuccess && (
        <Alert severity="info">
          Veuillez vérifier votre e-mail pour activer votre compte
        </Alert>
      )}
    </Box>
  );
}

export default SignUpPage;
