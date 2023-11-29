/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
// import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Body, postUser } from '@/api/apiCalls.ts';
import TextInput from '@/components/TextInput.tsx';

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
  const { t } = useTranslation();

  const [state, setState] = useState<SignupState>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    apiProgress: false,
    signupSuccess: false,
    errors: {} as Errors,
  });

  // const postUser = (body: Body) => {
  //   return Axios.post('/api/v1/users', body, {
  //     headers: {
  //       'Accept-Language': i18n.language,
  //     },
  //   });
  // };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    // WARN: if you need to update an object in state, it is
    //   VERY IMPORTANT to make a copy of that object first
    //   This is not necessary in our case because we have no nested object
    // NOTE: Use the version below if the errors state has a nested object inside
    //   const errorsCopy = JSON.parse(JSON.stringify(state.errors));
    const errorsCopy = { ...state.errors };
    delete errorsCopy[id as keyof typeof errorsCopy];

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

  const { apiProgress, errors, password, passwordRepeat, signupSuccess } =
    state;
  let disabled = true;
  if (password && passwordRepeat) {
    disabled = password !== passwordRepeat;
  }

  const passwordMismatch =
    password !== passwordRepeat && passwordRepeat !== ''
      ? t('signup.passwordMismatch')
      : '';

  return (
    <div style={{ paddingTop: '40px' }}>
      {!signupSuccess && (
        <Paper
          elevation={3}
          style={{
            padding: '10px',
            // marginTop: '50px',
            maxWidth: '400px',
            marginInline: 'auto',
          }}
        >
          <form data-testid="form-signup" autoComplete="off">
            <Stack
              className="stack"
              // sx={{ width: '100%' }}
              spacing={2}
            >
              <Typography
                component="h1"
                variant="h4"
                mb={2}
                textAlign="center"
                color="primary"
              >
                {t('signup.signup')}
              </Typography>

              <TextInput
                id="username"
                label={t('signup.username')}
                placeholder={t('signup.username')}
                onChange={onChange}
                help={errors?.username || ''}
              />

              <TextInput
                id="email"
                label={t('signup.email')}
                placeholder="name@email.com"
                type="email"
                onChange={onChange}
                help={errors?.email || ''}
              />

              <TextInput
                id="password"
                label={t('signup.password')}
                placeholder="••••••••"
                type="password"
                onChange={onChange}
                help={errors?.password || ''}
              />

              <TextInput
                id="passwordRepeat"
                label={t('signup.passwordRepeat')}
                placeholder="••••••••"
                type="password"
                onChange={onChange}
                help={passwordMismatch}
              />

              <Button
                color="primary"
                // size="large"
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
                {t('signup.signup')}
              </Button>

              {/* <LanguageSelector /> */}
            </Stack>
          </form>
        </Paper>
      )}
      {/* </Paper> */}

      <Box>
        {signupSuccess && <Alert severity="info">{t('signup.success')}</Alert>}
      </Box>
    </div>
  );
}

export default SignupPage;
