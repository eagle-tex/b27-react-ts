import { FormControl, FormLabel, Input } from '@chakra-ui/react';
// type Props = {}

function SignUpPage(/* {}: Props */) {
  return (
    <div>
      <h1>Connexion</h1>

      <FormControl>
        <FormLabel htmlFor="username">Identifiant</FormLabel>
        <Input type="text" placeholder="Identifiant" id="username" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input type="email" placeholder="Email" id="email" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Mot de passe</FormLabel>
        <Input placeholder="Mot de passe" id="password" />
      </FormControl>
    </div>
  );
}

export default SignUpPage;