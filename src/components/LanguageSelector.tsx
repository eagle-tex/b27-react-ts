import { Box, Button } from '@mui/material';

import i18n from '@/i18n/config.ts';

// type Props = {
//   onLanguageChange:(string)=>Promise<void>
// }

function LanguageSelector(/* {}: Props */) {
  const onLanguageChange = async (language: 'en' | 'fr') => {
    await i18n.changeLanguage(language);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      // minWidth="400px"

      width="100%"
      // maxWidth="100%"
      // mx="auto"
      // marginX="400px"
      mt={2}
      px={2}
      py={1}
      // sx={{
      //   border: 1,
      //   borderColor: '#aaaccc',
      //   borderWidth: 1,
      //   borderRadius: 1,
      // }}
      position="fixed"
      bottom={0}
    >
      <Button
        type="button"
        title="English"
        onClick={() => onLanguageChange('en')}
      >
        {/* EN */}
        <img src="https://flagcdn.com/24x18/gb.png" alt="Great Britain Flag" />
      </Button>
      <Button
        type="button"
        title="French"
        onClick={() => onLanguageChange('fr')}
      >
        <img src="https://flagcdn.com/24x18/fr.png" alt="French Flag" />
        {/* FR */}
      </Button>
    </Box>
  );
}

export default LanguageSelector;
