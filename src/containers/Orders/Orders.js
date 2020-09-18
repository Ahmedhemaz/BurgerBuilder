import React, { Component } from 'react';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
class Orders extends Component {

    state = {
        orders: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        this.props.onFetchOrders()
    }

    render() {
        let orders = this.props.orders.map(order => (
            <Order key={order.id}
                ingredients={order.ingredients}
                price={+order.price} />
        ));
        if (this.props.loading) orders = <Spinner />
        if (this.props.error) orders = <h1>{this.props.errorMsg}</h1>
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStoreStateToProps = state => {
    return {
        orders: state.ordersState.orders,
        loading: state.ordersState.loading,
        error: state.ordersState.error,
        errorMsg: state.ordersState.errorMsg
    }
}

const mapStoreDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actionCreators.fetchOrders()),
        onLoadOrders: () => dispatch()
    }
}

export default connect(mapStoreStateToProps, mapStoreDispatchToProps)(withErrorHandler(Orders, axios));