import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Menu from './components/Menu';
import RouteWithLayout from './Layouts/MenuComComponente';

//import Agenda from './components/Agenda'
import Cliente from './pages/Cliente'
import NotFound from './pages/NotFound';

const Routes = () => {
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/Agenda"
        />      
        <RouteWithLayout
          component={Cliente}
          layout={Menu}
          path="/Cliente"
        />  
        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    );
  };
  
  export default Routes;