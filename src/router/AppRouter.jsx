import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {AuthRoutes} from "../auth/routes/AuthRouter.jsx";
import {CrmRouter} from "../crm/routes/CrmRouter.jsx";
import {useAuthStore} from "../auth/hooks/index.js";
import {useEffect} from "react";

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

    useEffect(() => {
        checkAuthToken();
    }, [])


    return (
        <BrowserRouter>
            <Routes>
            {
                ( status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<AuthRoutes/>}></Route>
                            <Route path='/*' element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CrmRouter/>}></Route>
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }

            {/*<div className="d-flex justify-content-center align-items-center clase_cargando">*/}
            {/*    <div className="spinner-border" role="status">*/}
            {/*        <span className="visually-hidden">Loading...</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
            </Routes>
        </BrowserRouter>
    );
};
