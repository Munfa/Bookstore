import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './container/Home';
import Signup from './container/Signup';
import Signin from './container/Signin';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions/auth.actions';
import { getInitialData } from './actions/initialData.action';
import Products from './container/Products';
import Orders from './container/Orders';
import Category from './container/Category';
import NewPage from './container/NewPage';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  
  useEffect(() => {
      if(!auth.authenticate){
          dispatch(isUserLoggedIn());
      }
      if(auth.authenticate){
        dispatch(getInitialData());
      }
      
    }, [auth.authenticate]);

  return (
    <div className="App">
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/page" component={NewPage} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/orders" component={Orders} />


          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
    </div>
  );
}

export default App;
