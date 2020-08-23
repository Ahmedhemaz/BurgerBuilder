import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props)=> {
    const attachedClasses = props.open ?  [classes.SideDrawer, classes.Open]: [classes.SideDrawer, classes.Close] ;
    return (
        <Aux>
            <BackDrop show={props.open}/>
            <div className = {attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;