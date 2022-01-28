import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import { LoginScreen } from "../Components/Auth/LoginScreen";
import { CalendarScreen } from "../Components/Calendar/CalendarScreen";
import { LoadingScreen } from "../Components/Loading/LoadingScreen";
import { startChecking } from "../Store/Auth/AuthActions";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouteer = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector( state => state.Auth );

    useEffect(() => {
      dispatch( startChecking() );
    }, [dispatch]);
    
    if( checking ){
        return (
            <LoadingScreen/>
        );
    }

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="calendar-app/login" element={ <PublicRoute isLogin={ !!uid } /> }>
                        <Route index element={ <LoginScreen /> } />
                    </Route>
                    <Route path="calendar-app/" element={ <PrivateRoute isLogin={ !!uid } /> }>
                        <Route index element={ <CalendarScreen /> } />
                    </Route>
                    <Route path="*" element={ <Navigate to="calendar-app/" /> } />
                </Routes>
            </div>
        </Router>
    )
}
