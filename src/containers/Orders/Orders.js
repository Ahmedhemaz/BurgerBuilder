import React, { Component } from 'react';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order'
class Orders extends Component {

    state = {
        orders: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(() => this.setState({ loading: false, error: true }));
    }
    render() {
        let orders = this.state.orders;
        console.log(orders);
        if (this.state.loading) orders = <Spinner />
        if (this.state.error) orders = <h1>Network Error</h1>
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} />
                ))}
            </div>
        )
    }
}

export default Orders;