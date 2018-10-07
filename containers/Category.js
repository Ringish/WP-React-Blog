import React, {Component} from 'react';
import wpAPI from '../api/wp.js';
import { connect } from 'react-redux'
import {
  selectCategory,
  fetchPostsIfNeeded,
  getCategories
} from '../actions'

import Header from '../components/Header'
import Menu from '../components/Menu'
import Post from '../components/Post'

import Footer from '../components/Footer';

import '../App.scss';


class Category extends Component {

  constructor(props) {
    super(props)
  }
  

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(this.props.getCategories());
    const selectedCategory = this.props.location.pathname.replace('/category/','').replace('/','')
    dispatch(selectCategory(selectedCategory))
    dispatch(fetchPostsIfNeeded(selectedCategory))
    
  }

  componentDidUpdate(prevProps) {
    console.log(1)
    if (this.props.location.pathname.replace('/category/','').replace('/','') !== prevProps.location.pathname.replace('/category/','').replace('/','')) {
      
      const { dispatch } = this.props
      const selectedCategory = this.props.location.pathname.replace('/category/','').replace('/','')
      dispatch(selectCategory(selectedCategory))
      dispatch(fetchPostsIfNeeded(selectedCategory))
      dispatch(fetchPostsIfNeeded(selectedCategory))
    }
  }



  render() {
    const { selectedCategory, posts, isFetching, lastUpdated, getCategories, badges } = this.props
    const selectedBadge = this.props.location.hash
    return (
      <div>
      <Header />
      <Menu />


      {isFetching && posts.length === 0 && <main className="posts container"><h2>Laddar...</h2></main>}
      {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
      {posts.length > 0 &&
        <main className="posts container">
        {posts.map(item => (
          <Post badges={badges} post={item} selectedBadge={selectedBadge}>{item.title.rendered}</Post>
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
          getCategories,
          badges
        }
      }
       
      export default connect(mapStateToProps)(Category)