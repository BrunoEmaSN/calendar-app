import React from 'react';
import PropTypes from 'prop-types';

import { Navigate, Outlet } from 'react-router-dom';


export const PrivateRoute = ({
    isLogin
}) => {
    return isLogin ? <Outlet /> : <Navigate to ="/calendar-app/login" />
}

PrivateRoute.propTypes = {
    isLogin: PropTypes.bool.isRequired
}
