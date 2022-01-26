import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
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
                    <Route exact path="/login" element={ <PublicRoute isLogin={ !!uid } /> }>
                        <Route exact path="/login" element={ <LoginScreen /> } />
                    </Route>
                    <Route exact path="/" element={ <PrivateRoute isLogin={ !!uid } /> }>
                        <Route exact path="/" element={ <CalendarScreen /> } />
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}
