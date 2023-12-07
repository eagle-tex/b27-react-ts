import { Alert, CircularProgress, Container } from '@mui/material';
// import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { activate } from '@/api/apiCalls.ts';
import i18n from '@/i18n/config.ts';

// type Props = {
//   match: {
//     params: {
//       token: string;
//     };
//   };
// };

type MyParams = {
  token: string;
};

type TResult = 'success' | 'fail' | undefined;

// function AccountActivationPage({ match }: Props) {
function AccountActivationPage() {
  const { t } = i18n;
  // const [result, setResult] = useState<TResult>('success');
  const [result, setResult] = useState<TResult>(undefined);
  const { token } = useParams<MyParams>();

  useEffect(() => {
    activate(token as string)
      .then(() => {
        setResult('success');
      })
      .catch(() => {
        setResult('fail');
        console.log({ where: 'activate - catch' });
      });
  }, [token]);

  return (
    <div data-testid="activation-page" style={{ paddingTop: '40px' }}>
      {result === 'success' && (
        <Container maxWidth="xs">
          <Alert severity="success">{t('account.activated')}</Alert>
          <p>{JSON.stringify(token)}</p>
          <h4>{JSON.stringify({ token })}</h4>
        </Container>
      )}

      {result === 'fail' && (
        <Container maxWidth="xs">
          <Alert severity="error">{t('account.activationFailure')}</Alert>
          <p>{JSON.stringify(token)}</p>
        </Container>
      )}

      {!result && (
        <span role="status">
          <CircularProgress size={16} />{' '}
        </span>
      )}
    </div>
  );
}

// AccountActivationPage.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       token: PropTypes.string,
//     }),
//   }),
// };
//
// AccountActivationPage.defaultProps = {
//   match: {
//     params: {
//       token: 'dummy-token',
//     },
//   },
// };

export default AccountActivationPage;
