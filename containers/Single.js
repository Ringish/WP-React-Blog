import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


import Header from '../components/Header'
import Menu from '../components/Menu'

import Footer from '../components/Footer';

import {fetchPost} from '../actions.js';


class Single extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.fetchPost(nextProps.location.pathname);
    }
  }

  render() {
    const { singlePost } = this.props
    let post = singlePost[0]
    return (
      <div data-id={singlePost.id}>
      <Header />
      <Menu />
      {singlePost.length > 0 &&
        <article className="single-post container">
        {post._embedded['wp:featuredmedia']  && <img className="featured-image" src={post._embedded['wp:featuredmedia'][0].source_url} />}
        <h1>{ReactHtmlParser(post.title.rendered)}</h1>
        <div class="post-content">
        {ReactHtmlParser(post.content.rendered)}
        </div>
        <a className="button" target="_blank" href={'https://www.facebook.com/sharer/sharer.php?u='+post.link}>Dela på Facebook</a> <a className="button" target="_blank" href={'https://twitter.com/home?status='+ReactHtmlParser(post.title.rendered)+'%20-%20'+post.link}>Dela på Twitter</a>

</article>
      }
      <Footer />
      </div>
      );
  }
}


function mapStateToProps({singlePost}) {
  return {singlePost};
}

export default connect(mapStateToProps, {fetchPost})(Single)