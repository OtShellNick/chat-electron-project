import React, {lazy, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom';

import Layout from '@components/Layout/Layout';
import {getSettings} from "@helpers/saveSettings";

const Login = lazy(() => import('@components/Login/Login'));
const Dashboard = lazy(() => import('@components/Dashboard/Dashboard'));

import '@styles/main.scss';

const App = () => {

    useEffect(() => {
        getSettings('jwt');
    });

    return <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
    </Routes>
}

export default App
