import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const privateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            isLoggedin() ?
                <Component {...props} />
                : <Redirect to="/" />
        }} />
    )
}

export default privateRoute;