import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { LoginScreen } from "../Components/Auth/LoginScreen";
import { CalendarScreen } from "../Components/Calendar/CalendarScreen";

export const AppRouteer = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/login" element={
                        <LoginScreen />
                    }/>
                    <Route exact path="/" element={
                        <CalendarScreen />
                    }/>

                    <Route path="*" element={<Navigate to ="/" />}/>
                </Routes>
            </div>
        </Router>
    )
}
