import React, {useEffect, useState} from "react";
import * as CookieHelper from '@helpers/cookie';
import CustomSwitch from "@containers/Switch/Switch";

import './Dashboard.scss';
import {connectToChat} from "@requests/chat";
import {getSettings} from "@requests/settings";

const Dashboard = () => {
    const auth = CookieHelper.get('authorization');
    const [close, setClose] = useState(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
       getSettings();
    });

    return <div className='dashboard'>
        <CustomSwitch checked={checked} on='Включить бота' off='Выключить бота' onChange={({target}) => {
            if(target.checked) {
                const closeChat = connectToChat(auth);
                setClose(closeChat);
            } else {
                close();
            }

            setChecked(target.checked);
        }}/>
    </div>
}

export default Dashboard;