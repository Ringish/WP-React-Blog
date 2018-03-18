import React from 'react'
import { NavLink } from 'react-router-dom'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

 
const Post = ({ post, children }) => (
  <article className="post">
  <div className="img-holder">{post._embedded['wp:featuredmedia']  && <img className="featured-image" src={post._embedded['wp:featuredmedia'][0].source_url} />}</div>
  <h3 className="post-title">
  <NavLink to={post.link.replace('http://174.138.5.191/','') === 'SHOW_ALL' ? '/' : `/${ post.link.replace('http://174.138.5.191/','') }`}>
    {children}
  </NavLink></h3>
  <summary className="excerpt">{ReactHtmlParser(post.excerpt.rendered)}</summary>
  <div class="post-info">
  <section class="author">
  <img class="author-avatar" src={post._embedded.author[0].avatar_urls[48]} />
  {post._embedded.author[0].name}
  </section>
  </div>
  </article>
)
 
export default Post