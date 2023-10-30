import { Box, Button, Stack, TextField, Typography } from '@mui/material';

// type Props = {}

function SignUpPage(/* {}: Props */) {
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
      {/* <Box texAlign="left"> */}
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

        <Stack sx={{ width: '100%' }} spacing={2}>
          {/* <form> */}
          <TextField
            id="username"
            label="Identifiant"
            placeholder="Identifiant"
            variant="outlined"
            name="username"
            type="text"
            fullWidth
          />
          <TextField
            id="email"
            label="Email"
            placeholder="votre@email.com"
            variant="outlined"
            name="email"
            type="email"
            fullWidth
          />
          <TextField
            id="password"
            label="Mot de passe"
            placeholder="••••••••"
            variant="outlined"
            name="password"
            type="password"
            fullWidth
          />
          <TextField
            id="passwordRepeat"
            label="Confirmer mot de passe"
            placeholder="••••••••"
            variant="outlined"
            name="passwordRepeat"
            type="password"
            fullWidth
          />

          <Button
            color="success"
            size="large"
            variant="contained"
            fullWidth
            disabled
          >
            Connexion
          </Button>
          {/* </form> */}
        </Stack>
      </Box>
    </Box>
  );
}

export default SignUpPage;
