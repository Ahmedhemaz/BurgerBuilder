import React from 'react';
import classes from './NavigationItem.module.css'
const navigationItem = (props)=>(
    <li className = {classes.NavigationItem}>
        <a href='/' 
            className = {props.active? classes.BtnActive: null}>
                {console.log(classes.BtnActive)}
            {props.children}
        </a>
    </li>
);

export default navigationItem;