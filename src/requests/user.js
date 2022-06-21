import { Server } from '@helpers/server'
import {checkAuth} from "@helpers/checkAuth";
import * as CookieHelper from '@helpers/cookie';

export const getSelf = (access_token) => {
  return Server('get', 'user/v1/user/me', {access_token})
      .catch(checkAuth)
}

export const login = (authCode) => {
  return Server('post', 'v1/auth/login', {authCode});
};

export const logout = () => {
  return Server('post', 'v1/auth/logout').then(() => {
    CookieHelper.del('authorization');
    location.replace('/login');
  });
}

export const refreshToken = (jwt) => {
  return Server('post', 'user/v1/user/refresh', {access_token: jwt})
      .catch(checkAuth);
}