import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from 'private-route-react';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
function App() {
  return (
    <div >
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <PrivateRoute path={'/checkout'} component={Checkout} isAbleToAccessRoute={() => true} redirectPath={'/'} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
