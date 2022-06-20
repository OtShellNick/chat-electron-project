import React, {Suspense, useEffect} from "react";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as CookieHelper from '@helpers/cookie';

import Preloader from "@components/Preloader/Preloader";
import Header from "@components/Layout/Header/Header";
import Aside from "@components/Layout/Aside/Aside";

import {loginUser} from '@store/userStore/userStore';
import {getSelf, login, refreshToken} from "@/requests/user";

import './Layout.scss';

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search).get('code');
    const auth = CookieHelper.get('authorization');
    const {user} = useSelector((state) => state.user);

    useEffect(() => {
        if (searchParams) {
            login(searchParams).then((user) => {
                dispatch(loginUser(user));
                CookieHelper.set('authorization', user.jwt);
                navigate('/');
            });
        }

        if(!searchParams && !auth && location.pathname !== '/login') navigate('/login');

        if (!user.id) {
            getSelf().then((user) => {
                dispatch(loginUser(user));
            });
        }

        if(user.id && location.pathname === '/login') navigate('/');
    }, [searchParams, user]);

    useEffect(() => {
        if(auth) {
            setInterval(() => {
                refreshToken(auth).then((user) => {
                    dispatch(loginUser(user));
                })
            }, 1000 * 60 * 60 * 2);
        }
    }, [auth])

    return <div className='layout'>
        <Aside user={user}/>
        <main>
            <Header/>
            <Suspense fallback={<Preloader/>}>
                <Outlet/>
            </Suspense>
        </main>
    </div>
}

export default Layout;