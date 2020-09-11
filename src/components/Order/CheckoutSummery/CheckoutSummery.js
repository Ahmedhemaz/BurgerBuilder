import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.module.css';
const checkoutSummery = (props) => {
    return (
        <div className={classes.CheckoutSummery}>
            <h1> B el sem el hary </h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.cancelCalled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueCalled}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummery;