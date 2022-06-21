import React, {lazy, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import * as CookieHelper from '@helpers/cookie';
import {getSelf, login} from "@requests/user";
import {loginUser} from "@store/userStore/userStore";

import Layout from '@components/Layout/Layout';

const Login = lazy(() => import('@components/Login/Login'));
const Dashboard = lazy(() => import('@components/Dashboard/Dashboard'));

import '@styles/main.scss';

const App = () => {
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
    }, [searchParams, user, auth]);

    return <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
    </Routes>
}

export default App
