import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
const modal = (props)=> (
    <Aux>
        <Backdrop show={props.show}/>
        <div className = {classes.Modal}>
            {props.children}
        </div>
    </Aux>
);

export default React.memo(modal);