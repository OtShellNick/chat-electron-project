import { Server } from '@helpers/server'
import {checkAuth} from "@helpers/checkAuth";
import * as CookieHelper from '@helpers/cookie';

export const getSettings = () => {
    Server('get', 'settings/v1/settings/get')
        .catch(checkAuth);
}