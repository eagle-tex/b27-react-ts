/* eslint-disable import/no-extraneous-dependencies */
import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@/api/axiosConfig.ts';

export const mockedUser = {
  username: 'user1',
  email: 'user1@mail.com',
  password: 'P4ssword',
};

export const postUserMock = http.post(
  `${BASE_URL}/api/v1/users`,
  async ({ request }) => {
    const response = await request.json();
    console.log({ where: 'IN POST HANDLER', response });
    return HttpResponse.json(response, { status: 201 });
  }
);

export const getUsersMock = http.get(`${BASE_URL}/api/v1/users`, () => {
  console.log('IN GET HANDLER');
  return HttpResponse.json(mockedUser);
});

export const handlers = [
  // http.post('http://localhost:3030/api/v1/users', (/* { request } */) => {
  //   // const response = await request.json();
  //   console.log('IN POST HANDLER');
  //   return HttpResponse.json(mockedUser, { status: 201 });
  // }),
  // http.get('http://localhost:3030/api/v1/users', () => {
  //   console.log('IN GET HANDLER');
  //   return HttpResponse.json(mockedUser);
  // }),
  postUserMock,
  getUsersMock,
];
