import React, {useEffect, useState} from "react";
import CustomSwitch from "@containers/Switch/Switch";

import {getSettings, updateSettings} from "@requests/settings";

import './Bot.scss';

const Bot = () => {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        if(!settings.id) getSettings()
            .then(setSettings);
    }, [settings]);

    return <div className='dashboard'>
        <CustomSwitch checked={settings.botOn} on='Включить бота' off='Выключить бота' onChange={({target}) => {
            updateSettings({botOn: target.checked})
                .then(setSettings);
        }}/>
    </div>
};

export default Bot;