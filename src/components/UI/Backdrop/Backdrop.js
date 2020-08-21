import React from 'react';
import classes from './Backdrop.module.css';
import ModalContext from '../../../context/modal-context';

const backdrop = (props) => (
    <ModalContext.Consumer>
        {
            (context) => {
                return props.show? <div className = {classes.Backdrop} onClick = {context.close}></div>: null
            }
        }
    </ModalContext.Consumer>
);

export default backdrop;