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
// import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import {FR,GB} from 'country-flag-icons/react/3x2'

import { Body } from '@/api/apiCalls.ts';
import Axios from '@/api/axiosConfig.ts';
import TextInput from '@/components/TextInput.tsx';
import i18n from '@/i18n/config.ts';

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

  // function isDisabled() {
  const { apiProgress, errors, password, passwordRepeat, signupSuccess } =
    state;
  let disabled = true;
  if (password && passwordRepeat) {
    disabled = password !== passwordRepeat; // || apiProgress;
  }

  const passwordMismatch =
    password !== passwordRepeat ? t('signup.passwordMismatch') : '';

  const onLanguageChange = async (language: 'en' | 'fr') => {
    await i18n.changeLanguage(language);
  };

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
          p={2}
          minWidth="400px"
          maxWidth="500px"
          sx={{
            border: 1,
            borderColor: '#aaaccc',
            borderWidth: 1,
            borderRadius: 1,
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
                {t('signup.signup')}
              </Button>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <button
                  type="button"
                  title="English"
                  onClick={() => onLanguageChange('en')}
                >
                  {/* EN */}
                  <img
                    src="https://flagcdn.com/24x18/gb.png"
                    alt="Great Britain Flag"
                  />
                </button>
                <button
                  type="button"
                  title="French"
                  onClick={() => onLanguageChange('fr')}
                >
                  <img
                    src="https://flagcdn.com/24x18/fr.png"
                    alt="French Flag"
                  />
                  {/* FR */}
                </button>
              </Box>
            </Stack>
          </form>
        </Box>
      )}

      <Box>
        {signupSuccess && <Alert severity="info">{t('signup.success')}</Alert>}
      </Box>
    </Box>
  );
}

export default SignupPage;
