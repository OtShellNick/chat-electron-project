import React, {Suspense} from "react";
import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Preloader from "@components/Preloader/Preloader";
import Header from "@components/Layout/Header/Header";
import Aside from "@components/Layout/Aside/Aside";

import './Layout.scss';

const Layout = () => {
    const {user} = useSelector((state) => state.user);

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