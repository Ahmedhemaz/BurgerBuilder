import React from 'react';
import classes from './BuildControl.module.css';
import AddIngredientContext from '../../../../context/addIngredient-context'

const buildControl = (props)=>(
    <AddIngredientContext.Consumer>
        { (context)=>{
             return(
                <div className = {classes.BuildControl}>
                    <div className = {classes.Label}>{props.label}</div>
                    <button disabled={!context.disableRemoveIngredientsInfo[props.type]}  
                            className = {classes.Less} 
                            onClick = {()=>context.removeIngredients(props.type)}>Less</button>
            
                    <button className = {classes.More} 
                            onClick = {()=>context.addIngredients(props.type)}>More</button>
                </div>
             )}
        }
    </AddIngredientContext.Consumer>
);

export default buildControl;