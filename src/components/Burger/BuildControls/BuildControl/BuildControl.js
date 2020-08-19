import React from 'react';
import classes from './BuildControl.module.css';
import AddIngredientContext from '../../../../context/addIngredient-context'

const buildControl = (props)=>(
    <AddIngredientContext.Consumer>
        { (context)=>{
             return(
                <div className = {classes.BuildControl}>
                    <div className = {classes.Label}>{props.label}</div>
                    <button className = {classes.Less}>Less</button>
                    <button className = {classes.More} onClick={()=>{context.addIngredients(props.type)}}>More</button>
                </div>
             )}
        }
    </AddIngredientContext.Consumer>
);

export default buildControl;