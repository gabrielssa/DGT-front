import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Register from '../pages/register';
import Login from '../pages/login';
import Home from '../pages/home';

import PrivateRoute from '../components/PrivateRoute';

const Routes = () => (

    <Router >
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/home" component={Home} />
      </Switch>
    </Router>
  )

export default Routes;