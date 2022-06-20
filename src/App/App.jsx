import React, {lazy, useEffect} from 'react'
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import * as CookieHelper from '@helpers/cookie';

import Layout from '@components/Layout/Layout';

const Login = lazy(() => import('@components/Login/Login'));
const Dashboard = lazy(() => import('@components/Dashboard/Dashboard'));

import '@styles/main.scss';

const App = () => {
    const auth = CookieHelper.get('authorization');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth && location.pathname !== '/login') navigate('/login');
    }, [auth])

    return <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
    </Routes>
}

export default App
