import React from 'react'
import ReactDOM from 'react-dom/client'
import {CrmApp} from "./CrmApp.jsx";
import {Provider} from 'react-redux';
import {store} from "./store";

import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <CrmApp/>
        </Provider>
    </React.StrictMode>
)
