import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import ModalContext from '../../context/backDrop-context';
class Layout extends Component{
    state = {
        showSideDrawer: false,
    }

    closeSideDrawerHandler() {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler() {
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={()=> this.sideDrawerToggleHandler()}/>
                <ModalContext.Provider value={{close: ()=> this.closeSideDrawerHandler()}}>
                    <SideDrawer open={this.state.showSideDrawer}/>
                </ModalContext.Provider>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;