import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from 'private-route-react';
import Orders from './containers/Orders/Orders';
function App() {
  return (
    <div >
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <PrivateRoute path={'/checkout'} component={Checkout} isAbleToAccessRoute={() => true} redirectPath={'/'} />
          <Route path="/orders" component={Orders} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
