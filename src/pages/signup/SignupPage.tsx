/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
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

type SignupState = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  apiProgress: boolean;
  signupSuccess: boolean;
  errors: Errors;
};

function SignupPage(/* {}: Props */) {
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

    // WARN: if you need to update an object in state, it is
    //   VERY IMPORTANT to make a copy of that object first
    //   This is not necessary in our case because we have no nested object
    // NOTE: Use the version below if the errors state has a nested object inside
    //   const errorsCopy = JSON.parse(JSON.stringify(state.errors));
    const errorsCopy = { ...state };
    delete errorsCopy[id as keyof SignupState];

    setState((prevState) => {
      return { ...prevState, [id]: value, errors: errorsCopy };
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
          if (error.response?.status === 400) {
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

  const passwordMismatch =
    password !== passwordRepeat ? 'Password mismatch' : '';

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
                Sign up
              </Typography>

              <TextInput
                id="username"
                label="Username"
                placeholder="Username"
                onChange={onChange}
                help={errors?.username || ''}
              />

              <TextInput
                id="email"
                label="Email"
                placeholder="name@email.com"
                type="email"
                onChange={onChange}
                help={errors?.email || ''}
              />

              <TextInput
                id="password"
                label="Password"
                placeholder="••••••••"
                type="password"
                onChange={onChange}
                help={errors?.password || ''}
              />

              <TextInput
                id="passwordRepeat"
                label="Confirm password"
                placeholder="••••••••"
                type="password"
                onChange={onChange}
                help={passwordMismatch}
              />

              <Button
                color="primary"
                size="large"
                variant="contained"
                disabled={disabled || apiProgress}
                type="submit"
                onClick={submit}
              >
                {apiProgress && (
                  <span role="status" style={{ marginRight: '1rem' }}>
                    <CircularProgress size={16} />{' '}
                  </span>
                )}
                Sign up
              </Button>
            </Stack>
          </form>
        </Box>
      )}

      {signupSuccess && (
        <Alert severity="info">
          Please check your e-mail to activate your account
        </Alert>
      )}
    </Box>
  );
}

export default SignupPage;
