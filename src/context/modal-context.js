import React from 'react';

const backdropContext = React.createContext({
    close: ()=>{},
    continue: ()=>{}
});

export default backdropContext;
