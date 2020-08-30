import React from 'react';
import classes from './Spinner.module.css';

const spinner = ()=>(
    <div className={classes.SkFoldingCube}>
        <div className={[classes.SkCube1, classes.SkCube].join(' ')}></div>
        <div className={[classes.SkCube2, classes.SkCube].join(' ')}></div>
        <div className={[classes.SkCube3, classes.SkCube].join(' ')}></div>
        <div className={[classes.SkCube4, classes.SkCube].join(' ')}></div>
    </div>
);

export default spinner;