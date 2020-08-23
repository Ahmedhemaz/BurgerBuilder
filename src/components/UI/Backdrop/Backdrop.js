import React from 'react';
import classes from './Backdrop.module.css';
import BackDropContext from '../../../context/backDrop-context';

const backdrop = (props) => (
    <BackDropContext.Consumer>
        {
            (context) => {
                return props.show? <div className = {classes.Backdrop} onClick = {context.close}></div>: null
            }
        }
    </BackDropContext.Consumer>
);

export default backdrop;