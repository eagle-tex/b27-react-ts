import { Alert, Container } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { activate } from '@/api/apiCalls.ts';
import i18n from '@/i18n/config.ts';

type Props = {
  match: {
    params: {
      token: string;
    };
  };
};

type TResult = 'success' | 'fail';

function AccountActivationPage({ match }: Props) {
  const { t } = i18n;
  const [result, setResult] = useState<TResult>('fail');

  useEffect(() => {
    activate(match.params.token)
      .then(() => {
        setResult('success');
      })
      .catch(() => {
        setResult('fail');
        console.log({ where: 'activate - catch' });
      });
  }, [match.params.token]);

  return (
    <div data-testid="activation-page" style={{ paddingTop: '40px' }}>
      {result === 'success' && (
        <Container maxWidth="xs">
          <Alert severity="success">{t('account.activated')}</Alert>
          <p>{JSON.stringify(match)}</p>
        </Container>
      )}

      {result === 'fail' && (
        <Container maxWidth="xs">
          <Alert severity="error">{t('account.activationFailure')}</Alert>
          <p>{JSON.stringify(match)}</p>
        </Container>
      )}
    </div>
  );
}

AccountActivationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }),
};

AccountActivationPage.defaultProps = {
  match: {
    params: {
      token: 'dummy-token',
    },
  },
};

export default AccountActivationPage;
