// import axios from 'axios';

import Axios from '@/api/axiosConfig.ts';

type Body = {
  username: string;
  email: string;
  password: string;
};

export const postUser = (body: Body) => {
  Axios.post('/api/v1/users', body)
    .then((response) => {
      // console.log({
      //   where: 'in postUser',
      //   status: response.status,
      //   data: response.data as unknown,
      // });
      return response.data as Body;
    })
    .catch((err) => console.log(err));
};
