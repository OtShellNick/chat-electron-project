import * as CookieHelper from '@helpers/cookie';

export const saveSettings = (key, value) => {
    api.send('addSettings', {[key]: value})
}

export const getSettings = (key) => {
    receiveSettings();

    api.get('getSettings', key);
}

export const deleteSetting = key => {
    api.send('delSettings', key);
}

const receiveSettings = () => {
    api.receive('Settings', data => {
        switch (data.key) {
            case 'jwt':
                CookieHelper.set('authorization', data.data);
                break;
            case 'test':
                CookieHelper.set('test', data.data);
                break;
        }
    });
}