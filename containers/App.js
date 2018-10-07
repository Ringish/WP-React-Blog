import React, {Component} from 'react';
import wpAPI from '../api/wp.js';
import { connect } from 'react-redux'
import {
	selectCategory,
	fetchPostsIfNeeded,
  selectedBadges
} from '../actions'

import Header from '../components/Header'
import Menu from '../components/Menu'
import Badges from '../components/Badges'
import Post from '../components/Post'

import Footer from '../components/Footer'

import '../App.scss';


class App extends Component {
	
	constructor(props) {
		super(props)
	}
	

	componentDidMount() {
    console.log('app did mount');
    console.log(this.props)
    console.log('ya'+this.props.selectedBadges)
		const { dispatch, selectedCategory, } = this.props
    const selectedBadge = this.props.location.hash
    dispatch(selectCategory('all'))
		dispatch(fetchPostsIfNeeded(selectedCategory))
	}

	componentDidUpdate(prevProps) {
		if (this.props.selectedCategory !== prevProps.selectedCategory) {
			const { dispatch, selectedCategory } = this.props
      const {selectedBadge} = this.props.location.hash
			dispatch(fetchPostsIfNeeded(selectedCategory))
		}
	}



	render() {
    console.log('app render');
    console.log(this.props)
		const { selectedCategory, posts, isFetching, lastUpdated, badges } = this.props
    const selectedBadge = this.props.location.hash
		return (
      <div>
      <Header />
      <Menu />
        <Badges selectedBadge={selectedBadge} />

        {isFetching && posts.length === 0 && <main className="posts container"><h2>Laddar...</h2></main>}
        {!isFetching && posts.length === 0 && <main className="posts container"><h2>Inga inlägg.</h2></main>}
        {posts.length > 0 &&
          <main  className="posts container ">
            {posts.map(item => (
					<Post badges={badges} post={item} selectedBadge={selectedBadge}>{selectedBadge}</Post>
					))}
          </main>}
          <Footer />
      </div>
    )
	
}
}

function mapStateToProps(state) {
  const { selectedCategory, postsByCategory } = state
  const {
    isFetching,
    lastUpdated,
    badges,
    items: posts
  } = postsByCategory[selectedCategory] || {
    isFetching: true,
    items: []
  }
 
  return {
    selectedCategory,
    posts,
    isFetching,
    lastUpdated,
    badges
  }
}
 
export default connect(mapStateToProps)(App)