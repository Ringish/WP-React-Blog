import 'babel-polyfill'
import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux'
import { selectCategory, fetchPosts, fetchPostsIfNeeded } from './actions'
import rootReducer from './reducers'
import configureStore from './configureStore'
import App from './containers/App.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
 
import Single from './containers/Single.js'
const loggerMiddleware = createLogger()
 
const store = configureStore()
 
store
  .dispatch(fetchPostsIfNeeded('all'))

ReactDOM.render(
  <Provider store={store}>
  	<Router>
  	<Switch>
        <Route exact path="/" component={App} />
        <Route path="/:id" component={Single} />
        </Switch>
        </Router>
        </Provider>,
  document.getElementById("app")
);