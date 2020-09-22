import React from 'react';
import classes from './NavigationItems.module.css';
import NavogationItem from './NavigationItem/NavigationItem';
const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavogationItem link='/' exact >Burger Builder</NavogationItem>
        <NavogationItem link='/orders' >Orders</NavogationItem>
        <NavogationItem link='/auth' >Login</NavogationItem>
    </ul>
);

export default navigationItems;