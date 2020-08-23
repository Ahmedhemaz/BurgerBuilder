import React from 'react';
import classes from './NavigationItems.module.css';
import NavogationItem  from './NavigationItem/NavigationItem';
const navigationItems = () => (
    <ul className = {classes.NavigationItems}>
        <NavogationItem link = '/' active>Burger Builder</NavogationItem>
        <NavogationItem link = '/' >Checkout</NavogationItem>
    </ul>
);

export default navigationItems;