import 'babel-polyfill'
import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux'
import { selectCategory, fetchPosts, fetchPostsIfNeeded, getCategories } from './actions'
import rootReducer from './reducers'
import configureStore from './configureStore'
import App from './containers/App.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
 
import Single from './containers/Single.js'
import Category from './containers/Category.js'
const loggerMiddleware = createLogger()
 
const store = configureStore()

console.log(store
.dispatch(getCategories()))
 


ReactDOM.render(
  <Provider store={store}>
  <Router>
  <Switch>
  <Route exact path="/" component={App} />
  <Route path="/category/:id" component={Category} />
  <Route path="/:id" component={Single} />
  </Switch>
  </Router>
  </Provider>,
  document.getElementById("app")
  );