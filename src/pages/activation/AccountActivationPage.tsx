import { Alert, Container } from '@mui/material';

import i18n from '@/i18n/config.ts';

type Props = {
  match: {
    params: {
      token: string;
    };
  };
};

function AccountActivationPage({ match }: Props) {
  const { t } = i18n;

  return (
    <div data-testid="activation-page" style={{ paddingTop: '40px' }}>
      <Container maxWidth="xs">
        <Alert severity="success">{t('account.activated')}</Alert>
        <p>{JSON.stringify(match)}</p>
      </Container>
    </div>
  );
}

export default AccountActivationPage;
