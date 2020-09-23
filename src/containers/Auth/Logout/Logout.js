import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actionsCreator from '../../../store/actions/index';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/" />;
    }
}

const mapStoreDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionsCreator.logout())
    }
}

export default connect(null, mapStoreDispatchToProps)(Logout);