import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  FETCH_POST,
  MENU,
  CATEGORIES,
  BADGES,
  SELECT_BADGES
} from './actions.js'

function selectedCategory(state = 'all', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function selectedBadges(state = {}, action) {
  switch (action.type) {
    case SELECT_BADGES:
      return action.badge
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByCategory(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.category]: posts(state[action.category], action)
      })
    default:
      return state
  }
}

function singlePost(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      return action.data;
    }
    return state
}
function menu(state = {}, action) {
  switch (action.type) {
    case MENU:
      return action.data;
    }
    return state
}

function badges(state = {}, action) {
  switch (action.type) {
    case BADGES:
      return action.data;
    }
    return state
}

function categories(state = {}, action) {
  switch (action.type) {
    case CATEGORIES:
      return action.data;
    }
    return state
}

const rootReducer = combineReducers({
  categories,
  postsByCategory,
  selectedCategory,
  singlePost,
  menu,
  badges,
  selectedBadges
})
 
export default rootReducer