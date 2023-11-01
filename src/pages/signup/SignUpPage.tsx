/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

// type Props = {}

type SignupState = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

function SignUpPage(/* {}: Props */) {
  const [state, setState] = useState<SignupState>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    setState({
      ...state,
      username: currentValue,
    });
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    setState({
      ...state,
      email: currentValue,
    });
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    setState({
      ...state,
      password: currentValue,
    });
  };

  const onChangePasswordRepeat = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentValue = event.target.value;
    setState({
      ...state,
      passwordRepeat: currentValue,
    });
  };

  const submit = (_event: React.MouseEvent) => {
    // event.preventDefault();
    const { email, password, username } = state;
    const body = { username, email, password };
    axios
      .post('/api/1.0/users', body)
      .then((_res) => {
        // console.log(_res);
        // console.log(_res.data);
      })
      .catch((_err) => {
        // console.error(err)
      });
  };

  // useEffect(() => {
  //   console.log(state);
  // });

  function isDisabled() {
    let disabled = true;
    const { password, passwordRepeat } = state;
    if (password && passwordRepeat) {
      disabled = password !== passwordRepeat;
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
        // borderWidth={1}
        // borderRadius={8}
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
          Connexion
        </Typography>
        {/* </Box> */}

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
              onChange={onChangeUsername}
            />
            <TextField
              id="email"
              label="Email"
              placeholder="votre@email.com"
              variant="outlined"
              name="email"
              type="email"
              fullWidth
              onChange={onChangeEmail}
            />
            <TextField
              id="password"
              label="Mot de passe"
              placeholder="••••••••"
              variant="outlined"
              name="password"
              type="password"
              fullWidth
              onChange={onChangePassword}
            />
            <TextField
              id="passwordRepeat"
              label="Confirmer mot de passe"
              placeholder="••••••••"
              variant="outlined"
              name="passwordRepeat"
              type="password"
              fullWidth
              onChange={onChangePasswordRepeat}
            />

            <Button
              color="success"
              size="large"
              variant="contained"
              fullWidth
              disabled={isDisabled()}
              // onClick={() => submit}
              onClick={submit}
            >
              Connexion
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default SignUpPage;
