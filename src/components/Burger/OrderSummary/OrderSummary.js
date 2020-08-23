import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import BackDropContext from '../../../context/backDrop-context';


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
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <BackDropContext.Consumer>
                {
                    context => {return (
                        <Aux>
                            <Button btnType = "Danger"  clicked = {context.close}>CANCEL</Button>
                            <Button btnType = "Success" clicked = {context.continue}>CONTINUE</Button>
                        </Aux>
                    )}
                }
            </BackDropContext.Consumer>
            
        </Aux>
    )
}

export default React.memo(orderSummary);