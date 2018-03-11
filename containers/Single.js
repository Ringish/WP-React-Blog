import React, {Component} from 'react';
import {connect} from 'react-redux';

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
        console.log(singlePost)
        return (
          <div data-id={singlePost.id}>

          </div>
          );
        }
      }


function mapStateToProps({singlePost}) {
    return {singlePost};
}

export default connect(mapStateToProps, {fetchPost})(Single)