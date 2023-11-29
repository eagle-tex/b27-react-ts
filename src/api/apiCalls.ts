// import axios from 'axios';

import Axios from '@/api/axiosConfig.ts';
import i18n from '@/i18n/config.ts';

export type Body = {
  username: string;
  email: string;
  password: string;
};

export const postUser = (body: Body) => {
  return Axios.post('/api/v1/users', body, {
    headers: {
      'Accept-Language': i18n.language,
    },
  });
};
