import { Navigate, Route, Routes } from 'react-router-dom';
import {LoginPage} from "../pages/LoginPage.jsx";
import {RegisterPage} from "../pages/RegisterPage";
import {ForgotPasswordPage} from "../pages/ForgotPasswordPage";
import {ResetPasswordPage} from "../pages/ResetPasswordPage.jsx";

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage/>} />
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
            <Route path="reset-password" element={<ResetPasswordPage/>}/>
        </Routes>
    )
}
