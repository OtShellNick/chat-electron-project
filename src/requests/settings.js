import { Server } from '@helpers/server'
import {checkAuth} from "@helpers/checkAuth";
import * as CookieHelper from '@helpers/cookie';

export const getSettings = () => {
    return Server('get', 'settings/v1/settings/get')
        .catch(checkAuth);
};

export const updateSettings = ({botOn}) => {
    return Server('post', 'settings/v1/settings/update', {botOn})
        .catch(checkAuth);
};