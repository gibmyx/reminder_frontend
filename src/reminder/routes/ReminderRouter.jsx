import { Navigate, Route, Routes } from 'react-router-dom';
import {DashboardPage} from "../pages/DashboardPage.jsx";


export const ReminderRouter = () => {
    return (
        <Routes>
            <Route path="/" element={ <DashboardPage /> } />
        </Routes>
    )
}
