import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
import ModalContext from '../../../context/modal-context';


const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey=>(<li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                 </li>
                ));
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <ModalContext.Consumer>
                {
                    context => {return (
                        <Aux>
                            <Button btnType = "Danger"  clicked = {context.close}>CANCEL</Button>
                            <Button btnType = "Success" clicked = {context.continue}>CONTINUE</Button>
                        </Aux>
                    )}
                }
            </ModalContext.Consumer>
            
        </Aux>
    )
}

export default orderSummary;