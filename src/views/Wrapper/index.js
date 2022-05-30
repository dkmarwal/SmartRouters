import React from 'react';
import Dashboard from '../Dashboard';
import styles from './styles';
import { Route, Switch, useHistory,Redirect } from "react-router-dom";
import routes from '../../routes/index';
import Login from '../Login'

export default function Wrapper(props) {
  const classes = styles();
  const history = useHistory();
  const LoggedIN = localStorage.getItem("loggedin-user");
  const loginToken =
    LoggedIN == "true" ? true : false;
  return (
    <div className={classes.root}>
      <Switch>
     
     
        {/* <Route exact path={"/dashboard"}>
           <Dashboard />
         
        </Route> */}

        {/* <Route exact path={"/"}>
          {loginToken ? <Redirect to='/dashboard' /> : <Redirect to='/login'/>}
        </Route> */}
        
        <Route exact path={"/"}>
           <Dashboard />
         
        </Route>
        
        {routes && routes.map(route =>
          <Route key={route.key} path={route.path}>
            {route.component}
            {route && route.subRoutes && route.subRoutes.map(_route =>
              <Route
                history={history}
                key={_route.key}
                path={_route.path}>
                {_route.component}
              </Route>)}
          </Route>)}
         
      </Switch>
    </div>
  
    
  )
}

