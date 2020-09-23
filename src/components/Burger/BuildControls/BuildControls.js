import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => {
    const isDisabled = () => props.totalPrice > 0 ? false : true;
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BuildControl key={control.label} label={control.label} type={control.type} />
            ))}
            <button disabled={isDisabled()}
                className={classes.OrderButton}
                onClick={props.ordered}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP or IN TO ORDER'}</button>
        </div>
    );
}

export default buildControls;