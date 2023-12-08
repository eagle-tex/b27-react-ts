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
    async function activateRequest() {
      setResult(undefined);
      try {
        await activate(token as string);
        setResult('success');
      } catch (error: unknown) {
        setResult('fail');
      }
    }
    // setResult(undefined);
    // activate(token as string)
    //   .then(() => {
    //     setResult('success');
    //   })
    //   .catch(() => {
    //     setResult('fail');
    //     console.log({ where: 'activate - catch' });
    //   });
    activateRequest()
      .then(() => {
        // console.log('In then block');
      })
      .catch(() => {
        // console.log('In catch block');
      });
  }, [token]);

  let content = (
    <Container maxWidth="xs" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
      <span role="status">
        <CircularProgress size={60} thickness={6} />{' '}
      </span>
    </Container>
  );

  if (result === 'success') {
    content = (
      <Container maxWidth="xs">
        <Alert severity="success">{t('account.activated')}</Alert>

        {/* Dummy text */}
        <p>{JSON.stringify(token)}</p>
        <h4>{JSON.stringify({ token })}</h4>
      </Container>
    );
  } else if (result === 'fail') {
    content = (
      <Container maxWidth="xs">
        <Alert severity="error">{t('account.activationFailure')}</Alert>

        {/* Dummy text */}
        <p>{JSON.stringify(token)}</p>
      </Container>
    );
  }

  return (
    <div data-testid="activation-page" style={{ paddingTop: '40px' }}>
      {content}
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
