import React from 'react';
import classes from './Backdrop.module.css';
import BackDropContext from '../../../context/backdrop-context';

const backdrop = (props) => (
    <BackDropContext.Consumer>
        {
            (context) => {
                return props.show? <div className = {classes.Backdrop} onClick = {context.closeModal}></div>: null
            }
        }
    </BackDropContext.Consumer>
);

export default backdrop;