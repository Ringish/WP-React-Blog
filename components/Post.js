import React from 'react'
import { NavLink } from 'react-router-dom'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {getBadges} from '../actions.js';
import wpAPI from '../api/wp.js';
function showorhide(badge,selectedBadge) {
  if (selectedBadge.length < 1) {
    return 'show'
  }
  selectedBadge = selectedBadge.replace(/\D/g,'');
  if (parseInt(selectedBadge) == badge) {
    return 'show'
  }
  else {
    return 'hide'
  }
}

function get_badge(selectedBadge,badges) {
  console.log(badges);
  console.log('ababba')
}
 
const Post = ({ post, selectedBadge, badges }) => (
  <article dataTest={get_badge(selectedBadge,badges)} dataSelected={selectedBadge} dataBadge={post.badge} className={"post " + showorhide(post.badge, selectedBadge)+" post-"+post.id}>
  <div className="img-holder">{post._embedded['wp:featuredmedia']  && <img className="featured-image" src={post._embedded['wp:featuredmedia'][0].source_url} />}</div>
  <h3 className="post-title">
  <NavLink to={post.link.replace('http://sfsu.nu/foreningsdemokrati/','') === 'SHOW_ALL' ? '/' : `/${ post.link.replace('http://sfsu.nu/foreningsdemokrati/','') }`}>
    {ReactHtmlParser(post.title.rendered)}
    </NavLink></h3>
    <summary className="excerpt">{ReactHtmlParser(post.excerpt.rendered)}
    <NavLink className="read-more button" to={post.link.replace('http://sfsu.nu/foreningsdemokrati/','') === 'SHOW_ALL' ? '/' : `/${ post.link.replace('http://sfsu.nu/foreningsdemokrati/','') }`}>
      Läs mer
      </NavLink>

      </summary>
      <div class="post-info">
      <section class="author">
      <img class="author-avatar" src={post._embedded.author[0].avatar_urls[48]} />
      {ReactHtmlParser(post._embedded.author[0].name)}
      </section>
      </div>
      <img className="badge-image" src={post.badge_image} />
      </article>
    
      )
     
    export default Post