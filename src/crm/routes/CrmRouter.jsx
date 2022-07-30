import { Navigate, Route, Routes } from 'react-router-dom';
import {DashboardPage} from "../pages/DashboardPage.jsx";


export const CrmRouter = () => {
    return (
        <Routes>
            <Route path="/" element={ <DashboardPage /> } />
        </Routes>
    )
}
