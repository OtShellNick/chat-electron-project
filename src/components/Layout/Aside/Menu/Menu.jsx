import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

import BotIcon from '@assets/robot.svg?jsx';
import DashboardIcon from '@assets/dashboard.svg?jsx';

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location)
    const MENU = [
        {
          name: 'Dashboard',
            icon: <DashboardIcon/>,
            path: '/'
        },
        {
            name: 'Bot',
            icon: <BotIcon/>,
            path: '/bot'
        }
    ]

    return <>
        {MENU.map(item => <li
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`aside__list__item ${location.pathname === item.path ? 'aside__list__item_active' : ''}`}>
            {item.icon}
        </li>)}
    </>
}

export default Menu;