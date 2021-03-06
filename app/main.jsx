'use strict'
import React from 'react'
import store from './store'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import OrderSubmitted from './components/OrderSubmitted';

import Albums from './containers/Albums';
import Layout from './containers/Layout';
import Clothing from './containers/Clothing';
import CartContainer from './containers/CartContainer';
import ProductContainer from './containers/Products';
import AdminPanel from './containers/AdminPanel';
import Users from './containers/Users';
import User from './components/Admin/User';
import SingleProductContainer from './containers/singleProduct';
import FilterProductContainer from './containers/filteredProducts';


import {fetchAlbums, fetchClothing, fetchCurrentProduct, fetchCategories, fetchFilterAlbums} from './reducers/products';
import {fetchUsers} from './reducers/users';
import { fetchCart } from './reducers/cart';


function fetchInitialData() {
  store.dispatch(fetchAlbums());
  store.dispatch(fetchClothing());
  store.dispatch(fetchCategories());
  store.dispatch(fetchUsers());

}

function fetchFilteredData() {

  store.dispatch(fetchFilterAlbums());
}


function fetchCurrent(nextRouterState) {
  console.log('Next Router:', nextRouterState);
  store.dispatch(fetchCurrentProduct(nextRouterState.params.id));
  store.dispatch(fetchUsers());
}

function fetchCartItems() {

  store.dispatch(fetchCart())
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} onEnter={fetchInitialData}>
        <IndexRoute component={ProductContainer} />
        <Route path="/product/:id" component={SingleProductContainer} onEnter={fetchCurrent} />
        <Route path="/products" component={ProductContainer} />
        <Route path="/products/filtered" component={FilterProductContainer} />
        <Route path="/cart" component={CartContainer} onEnter ={fetchCartItems} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/albums" component={Albums} onEnter={()=>store.dispatch(fetchAlbums())} />
        <Route path="/clothing" component={Clothing} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/ordersubmitted" component={OrderSubmitted} />
        <Route path="/users" component={Users} />
        <Route path="/users/:id" component={User} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

