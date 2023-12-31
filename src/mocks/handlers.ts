/* eslint-disable import/no-extraneous-dependencies */
import { HttpResponse, delay, http } from 'msw';

import { BASE_URL } from '@/api/axiosConfig.ts';

export const mockedUser = {
  username: 'user1',
  email: 'user1@mail.com',
  password: 'P4ssword',
};

export const postUserMockSuccess = http.post(
  `${BASE_URL}/api/v1/users`,
  async ({ request }) => {
    await delay(300);
    const response = await request.json();
    console.log({ where: 'IN POST HANDLER', response });
    return HttpResponse.json(response, { status: 201 });
  }
);

export const postUserMockFailure = http.post(
  `${BASE_URL}/api/v1/users`,
  async (/* { request } */) => {
    await delay(200);
    // const response = await request.json();
    // console.log({ where: 'IN POST HANDLER', response });
    return HttpResponse.json(
      { validationErrors: { username: 'Username cannot be null' } },
      { status: 400 }
    );
  }
);

export const getUsersMock = http.get(`${BASE_URL}/api/v1/users`, () => {
  // console.log('IN GET HANDLER');
  return HttpResponse.json(mockedUser);
});

export const postActivationTokenMock = http.post(
  `${BASE_URL}/api/v1/activate/:token`,
  ({ params }) => {
    if (params.token === '5678') {
      return HttpResponse.json(null, { status: 400 });
    }
    return HttpResponse.json(null, { status: 200 });
  }
);

export const postUserTokenMock = http.post(
  `${BASE_URL}/api/v1/users/token/:token`,
  async ({ params }) => {
    await delay(1000);
    if (params.token === '5678') {
      return HttpResponse.json(null, { status: 400 });
    }
    return HttpResponse.json(null, { status: 200 });
  }
);

export const handlers = [
  postUserMockSuccess,
  postUserMockFailure,
  getUsersMock,
  postActivationTokenMock,
  postUserTokenMock,
];
