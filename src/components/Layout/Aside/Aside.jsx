import React from "react";

import './Aside.scss';

import LogoutIcon from '@assets/logout.svg?jsx';
import {logout} from "@requests/user";

const Aside = ({user}) => {
    const {profilePic, jwt} = user;
    return <div className='aside'>
        <ul className='aside__list'>
            <li className='aside__list__item'>
                <img className='aside__avatar' src={profilePic} alt="logo"/>
            </li>
            <li className='aside__list__item' onClick={() => {
                logout(jwt);
            }}>
                <LogoutIcon/>
            </li>
        </ul>
    </div>
}

export default Aside;