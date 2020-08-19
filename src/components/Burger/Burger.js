import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';


const burger = (props) => {
    let transFormedIngredients = Object.keys(props.ingredients)
                                    .map(igKey => {
                                        return [...Array(props.ingredients[igKey])] // create array with size of ingredient value
                                                .map((_,i) => { // fill that array with jsx of that ingredient ex [{meat},{meat}]
                                                    return <BurgerIngredient key={igKey + i} type={igKey}/> 
                                                });
                                    }).reduce((arr, el)=>{
                                        return arr.concat(el);
                                    }, []);
                                    
    if(transFormedIngredients.length === 0) transFormedIngredients = <p>Please Start adding ingredients!</p>
    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transFormedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;