import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


import Header from '../components/Header'

import {fetchPost} from '../actions.js';


class Single extends Component {
  componentWillMount() {
    this.props.fetchPost(this.props.location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.fetchPost(nextProps.location.pathname);
    }
  }
  componentDidUpdate() {
        //document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;;
      }
      render() {
        const { singlePost } = this.props
        let post = singlePost[0]
        return (
          <div data-id={singlePost.id}>
          <Header />

          {singlePost.length > 0 &&
          <article className="single-post container">
          {post._embedded['wp:featuredmedia']  && <img className="featured-image" src={post._embedded['wp:featuredmedia'][0].source_url} />}
          <h1>{post.title.rendered}</h1>
          <div class="post-content">
            {ReactHtmlParser(post.content.rendered)}
          </div>
          </article>
        }
          </div>
          );
      }
    }


    function mapStateToProps({singlePost}) {
      return {singlePost};
    }

    export default connect(mapStateToProps, {fetchPost})(Single)