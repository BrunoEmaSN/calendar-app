import React from 'react';
import PropTypes from 'prop-types';

import { Navigate, Outlet } from 'react-router-dom';


export const PublicRoute = ({
    isLogin
}) => {
    return !isLogin ? <Outlet /> : <Navigate to ="calendar-app/" />
}

PublicRoute.propTypes = {
    isLogin: PropTypes.bool.isRequired
}
