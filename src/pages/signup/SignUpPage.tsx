/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { postUser } from '@/api/apiCalls.ts';

// type Props = {}

type SignupState = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  apiProgress: boolean;
};

function SignUpPage(/* {}: Props */) {
  const [state, setState] = useState<SignupState>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    apiProgress: false,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setState({
      ...state,
      [id]: value,
    });
  };

  const submit = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { email, password, username } = state;
    const body = { username, email, password };
    setState({ ...state, apiProgress: true });
    return postUser(body);
  };

  function isDisabled() {
    let disabled = true;
    const { apiProgress, password, passwordRepeat } = state;
    if (password && passwordRepeat) {
      disabled = password !== passwordRepeat || apiProgress;
    } else {
      disabled = true;
    }
    return disabled;
  }

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
        <Typography
          component="h1"
          variant="h4"
          mb={2}
          textAlign="center"
          color="green"
        >
          Créer un compte
        </Typography>

        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <Stack sx={{ width: '100%' }} spacing={2}>
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
              color="success"
              size="large"
              variant="contained"
              fullWidth
              disabled={isDisabled()}
              type="submit"
              onClick={submit}
            >
              Créer un compte
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default SignUpPage;
