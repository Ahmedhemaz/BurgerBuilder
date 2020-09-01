import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import BackDropContext from '../../context/backDrop-context';
const withErrorHandler = (WrapperComponent, axios)=>{
    return class extends Component {

        state = {error: null};

        componentDidMount() {
            axios.interceptors.request.use(req =>{
                this.setState({error: null});
                return req;
            })
            axios.interceptors.response.use(null, error =>{
                this.setState({error: error});
            })
        }
        errorConfirmedHandler(){
            this.setState({error: null});
        }

        render(){
            return (
                <Aux>
                    {
                      this.state.error?
                        <BackDropContext.Provider value = {{close: ()=> this.errorConfirmedHandler()}}>
                            <Modal show={this.state.error}>
                                {this.state.error? this.state.error.message: null}
                            </Modal>
                        </BackDropContext.Provider>:
                      null
                    }
                    <WrapperComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;
