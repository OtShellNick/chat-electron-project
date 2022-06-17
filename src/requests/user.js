import { Server } from '@helpers/server'
import {checkAuth} from "@helpers/checkAuth";
import * as CookieHelper from '@helpers/cookie';
import {deleteSetting} from "@helpers/saveSettings";

export const getSelf = () => {
  return Server('get', 'user/v1/user/me')
      .catch(checkAuth)
}

export const login = (authCode) => {
  return Server('post', 'v1/auth/login', {authCode});
};

export const logout = () => {
  CookieHelper.del('authorization');
  deleteSetting('jwt');
  location.replace('/login');
}