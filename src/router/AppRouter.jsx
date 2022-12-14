import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {AuthRoutes} from "../auth/routes/AuthRouter.jsx";
import {ReminderRouter} from "../reminder/routes/ReminderRouter.jsx";
import {useAuthStore} from "../auth/hooks/index.js";
import {useEffect} from "react";

export const AppRouter = () => {

    const {status, checkAuthToken} = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {
                    (status === 'not-authenticated')
                        ? (
                            <>
                                <Route path="/auth/*" element={<AuthRoutes/>}></Route>
                                <Route path='/*' element={<Navigate to="/auth/login"/>}/>
                            </>
                        )
                        : (
                            <>
                                <Route path="/" element={<ReminderRouter/>}></Route>
                                <Route path="/*" element={<Navigate to="/"/>}/>
                            </>
                        )
                }
            </Routes>
        </BrowserRouter>
    );
};
