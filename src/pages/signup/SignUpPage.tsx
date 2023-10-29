import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
// type Props = {}

function SignUpPage(/* {}: Props */) {
  return (
    <Flex
      bg="gray.50"
      width="full"
      height="100vh"
      align="center"
      justifyContent="center"
    >
      <Box
        p={6}
        minWidth={400}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
      >
        <Box textAlign="center">
          <Heading as="h1" fontWeight="thin" size="lg">
            Connexion
          </Heading>
        </Box>

        <Box my={4} textAlign="left">
          <form>
            <FormControl>
              <FormLabel htmlFor="username">Identifiant</FormLabel>
              <Input type="text" placeholder="Identifiant" id="username" />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input type="email" placeholder="votre@email.com" id="email" />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel htmlFor="password">Mot de passe</FormLabel>
              <Input type="password" placeholder="********" id="password" />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel htmlFor="passwordRepeat">
                Confirmer mot de passe
              </FormLabel>
              <Input
                type="password"
                placeholder="********"
                id="passwordRepeat"
              />
            </FormControl>

            <Button colorScheme="teal" width="full" mt={6} mb={-3}>
              Connexion
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default SignUpPage;
