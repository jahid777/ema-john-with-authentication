import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFoundPage/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';






export const UserContext = createContext();



function App() {
  const [loggedInUser , setLoggedInUser] = useState({}); //change hoite pare abr nao pare
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>Email:{loggedInUser.email}</h3> {/* jehetu login user a amra signinwithEmailpassword a setLoggedInUser(newUserInfo) set krsi */}
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
              <Shop></Shop>
          </Route>
          <Route path="/review">
              <Review></Review>
          </Route>
          <PrivateRoute path="/manage">
              <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
              <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
              <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
              <Shop></Shop>
          </Route>
             <Route path="/product/:productKey"> {/*/product/ ar satthe product.js ar product ar match  koray*/}
              <ProductDetail></ProductDetail>
            </Route>
          <Route path="*">
              <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
