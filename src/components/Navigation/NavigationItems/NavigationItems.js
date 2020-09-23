import React from 'react';
import classes from './NavigationItems.module.css';
import NavogationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavogationItem link='/' exact >Burger Builder</NavogationItem>
        { props.isAuthenticated ? <NavogationItem link='/orders' >Orders</NavogationItem> : null}
        {   !props.isAuthenticated ?
            <NavogationItem link='/auth' >Login</NavogationItem> :
            <NavogationItem link='/logout' >Logout</NavogationItem>
        }


    </ul>
);

export default navigationItems;