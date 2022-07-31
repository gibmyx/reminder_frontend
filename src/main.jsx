import React from 'react'
import ReactDOM from 'react-dom/client'
import {ReminderApp} from "./ReminderApp.jsx";
import {Provider} from 'react-redux';
import {store} from "./store";

import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import "bootstrap";

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <Provider store={store}>
            <ReminderApp/>
        </Provider>
    // </React.StrictMode>
)
