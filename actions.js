import wpAPI from './api/wp.js';
 
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const FETCH_POST = 'FETCH_POST';
export const MENU = 'MENU';
export const BADGES = 'BADGES';

export const CATEGORIES = 'CATEGORIES';

export const SELECT_BADGES = 'SELECT_BADGES';

export function fetchPost(id) {
  return function (dispatch) {
    return fetch(wpAPI.posts.singleUrl+id)
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
      )
    .then(json =>
      dispatch({
        type: FETCH_POST,
        data: json
      })
      )
  }
}

export function getMenu(menu) {
  return function (dispatch) {
    return fetch(wpAPI.site.topMenuUrl)
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
      )
    .then(json =>
      dispatch({
        type: MENU,
        data: json
      })
      )
  }
}

export function getBadges(menu) {
  return function (dispatch) {
    return fetch(wpAPI.badges.listUrl)
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
      )
    .then(json =>
      dispatch({
        type: BADGES,
        data: json
      })
      )
  }
}

export function getCategories(categories) {
  return function (dispatch) {
    return fetch(wpAPI.categories.listUrl)
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
      )
    .then(json => 
      modifyCats(json)

      )
    .then(json =>
      dispatch({
        type: CATEGORIES,
        data: json
      })
      )
  }
}

function modifyCats(json) {
  var cats = {};
  for (var i=0; i<json.length;i++) {
    console.log(json[i]);
    cats[json[i].slug] = json[i];
  }
  return cats;
}


export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function selectBadges(badge) {
  return {
    type: SELECT_BADGES,
    badge
  }
}

export function getTaxIdFromSlug(tax, slug) {

  return fetch(wpAPI.posts.listUrl)
  .then(
    response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error)
        )
  .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
         
        dispatch(receivePosts(category, json))
        )

}


function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

function receivePosts(category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json,
    receivedAt: Date.now()
  }
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))
 
export function fetchPosts(category) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
   
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
     
    dispatch(requestPosts(category))
    var url = wpAPI.posts.listUrl
     if (category !== "all") {
      var url = wpAPI.posts.listUrl+'&&filter[category_name]='+category
    }
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
     
    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(url)
    .then(
      response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error)
        )
    .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
         
        dispatch(receivePosts(category, json))
        )

  }
}

 
function shouldFetchPosts(state, category) {
  if (!state.categories.length) {
    return true
  }
  const posts = state.postsByCategory[category]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}
 
export function fetchPostsIfNeeded(category) {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.
   
  // This is useful for avoiding a network request if
  // a cached value is already available.
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPosts(category))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}