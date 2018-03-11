import React, {Component} from 'react';
import wpAPI from '../api/wp.js';
import { connect } from 'react-redux'
import {
	selectCategory,
	fetchPostsIfNeeded
} from '../actions'

import Post from '../components/Post'



class App extends Component {
	
	constructor(props) {
		super(props)
	}
	

	componentDidMount() {
		const { dispatch, selectedCategory } = this.props
		dispatch(fetchPostsIfNeeded(selectedCategory))
	}

	componentDidUpdate(prevProps) {
		if (this.props.selectedCategory !== prevProps.selectedCategory) {
			const { dispatch, selectedCategory } = this.props
			dispatch(fetchPostsIfNeeded(selectedCategory))
		}
	}



	render() {
		const { selectedCategory, posts, isFetching, lastUpdated } = this.props
		return (
      <div>
        
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!isFetching &&
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            {posts.map(item => (
					<Post postId={item.id}>{item.title.rendered}</Post>
					))}
          </div>}
      </div>
    )
	
}
}

function mapStateToProps(state) {
  const { selectedCategory, postsByCategory } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByCategory[selectedCategory] || {
    isFetching: true,
    items: []
  }
 
  return {
    selectedCategory,
    posts,
    isFetching,
    lastUpdated
  }
}
 
export default connect(mapStateToProps)(App)