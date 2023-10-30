// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
// } from '@chakra-ui/react';
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
      {/* <Box textAlign="left"> */}
      <Box p={6} minWidth="400px" maxWidth="500px">
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

          <Button color="success" size="large" variant="contained" fullWidth>
            Connexion
          </Button>
          {/* </form> */}
        </Stack>
      </Box>
    </Box>
    //   <Flex
    //     bg="gray.50"
    //     width="full"
    //     height="100vh"
    //     align="center"
    //     justifyContent="center"
    //   >
    //     <Box
    //       p={6}
    //       minWidth={400}
    //       maxWidth="500px"
    //       borderWidth={1}
    //       borderRadius={8}
    //     >
    //       <Box textAlign="center">
    //         <Heading as="h1" fontWeight="thin" size="lg">
    //           Connexion
    //         </Heading>
    //       </Box>
    //
    //       <Box my={4} textAlign="left">
    //         <form>
    //           <FormControl>
    //             <FormLabel htmlFor="username">Identifiant</FormLabel>
    //             <Input type="text" placeholder="Identifiant" id="username" />
    //           </FormControl>
    //
    //           <FormControl mt={6}>
    //             <FormLabel htmlFor="email">Email</FormLabel>
    //             <Input type="email" placeholder="votre@email.com" id="email" />
    //           </FormControl>
    //
    //           <FormControl mt={6}>
    //             <FormLabel htmlFor="password">Mot de passe</FormLabel>
    //             <Input type="password" placeholder="********" id="password" />
    //           </FormControl>
    //
    //           <FormControl mt={6}>
    //             <FormLabel htmlFor="passwordRepeat">
    //               Confirmer mot de passe
    //             </FormLabel>
    //             <Input
    //               type="password"
    //               placeholder="********"
    //               id="passwordRepeat"
    //             />
    //           </FormControl>
    //
    //           <Button colorScheme="teal" width="full" mt={6} mb={-3}>
    //             Connexion
    //           </Button>
    //         </form>
    //       </Box>
    //     </Box>
    //   </Flex>
  );
}

export default SignUpPage;
