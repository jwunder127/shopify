'use strict'
import React from 'react'
import store from './store'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import LoginPage from './components/LoginPage';

import CartContainer from './containers/CartContainer';
import Layout from './containers/Layout';
import ProductContainer from './containers/Products';

import {fetchAlbums, fetchClothing} from './reducers/products';

function fetchInitialData() {
  store.dispatch(fetchAlbums());
  store.dispatch(fetchClothing());
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} onEnter={fetchInitialData}>
        <IndexRoute component={ProductContainer} />
        <Route path="login" component={LoginPage} />
        <Route path='cart' component={CartContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
