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
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';

import { Body } from '@/api/apiCalls.ts';
import Axios from '@/api/axiosConfig.ts';
import TextInput from '@/components/TextInput.tsx';

// import { postUser } from '@/api/apiCalls.ts';

// type Props = {}

interface UsernameError {
  username: string;
}
interface EmailError {
  email: string;
}

interface PasswordError {
  password: string;
}

interface Errors extends UsernameError, EmailError, PasswordError {}

interface ValidationError {
  validationErrors: Errors;
}

// const abc: ValidationError = {
//   validationErrors: {
//     username: 'username error',
//   },
// };
// console.log(abc);

type SignupState = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  apiProgress: boolean;
  signupSuccess: boolean;
  // errors: Record<string, string[]>;
  errors: Errors;
};

function SignUpPage(/* {}: Props */) {
  const [state, setState] = useState<SignupState>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    apiProgress: false,
    signupSuccess: false,
    errors: {} as Errors,
  });

  const postUser = (body: Body) => {
    return Axios.post('/api/v1/users', body);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  function isAxiosError<ResponseType>(
    error: unknown
  ): error is AxiosError<ResponseType> {
    return axios.isAxiosError(error);
  }

  const submit = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { email, password, username } = state;
    const body = { username, email, password };
    setState((prevState) => {
      return { ...prevState, apiProgress: true };
    });
    postUser(body)
      .then((response) => {
        setState((prevState) => {
          return { ...prevState, signupSuccess: true };
        });

        return response.data as Body;
      })
      .catch((error) => {
        if (isAxiosError<ValidationError>(error)) {
          // console.log('CATCHING - 1st IF');
          // if (error instanceof AxiosError<ValidationError,Record<string,unknown>>) {
          if (error.response?.status === 400) {
            // console.log('CATCHING - 2nd IF');
            // console.log({ errorType: typeof error });
            // console.log({ where: 'CATCH_0', errors: error.response.data });
            setState((prevState) => {
              return {
                ...prevState,
                errors: error.response?.data?.validationErrors as Errors,
              };
            });
          }

          setState((prevState) => {
            return { ...prevState, apiProgress: false };
          });
        }
        // console.log({ where: 'END OF CATCH_0', error: error as unknown });
      });
  };

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  // function isDisabled() {
  const { apiProgress, errors, password, passwordRepeat, signupSuccess } =
    state;
  let disabled = true;
  if (password && passwordRepeat) {
    disabled = password !== passwordRepeat; // || apiProgress;
  }
  // return disabled;
  // }

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
      {!signupSuccess && (
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

              <TextInput
                id="username"
                label="Identifiant"
                onChange={onChange}
                help={errors?.username || ''}
              />

              <TextInput
                id="email"
                label="Email"
                type="email"
                onChange={onChange}
                help={errors?.email || ''}
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
        </Box>
      )}

      {signupSuccess && (
        <Alert severity="info">
          Veuillez vérifier votre e-mail pour activer votre compte
        </Alert>
      )}
    </Box>
  );
}

export default SignUpPage;
