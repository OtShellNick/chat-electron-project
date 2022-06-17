import React from "react";
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from "@/App/App";
import store from '@store/mainStore';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>,
    );
}