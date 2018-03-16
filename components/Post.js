import React from 'react'
import { NavLink } from 'react-router-dom'
 
const Post = ({ post, children }) => (
  <NavLink
    to={post.link.replace('http://174.138.5.191/','') === 'SHOW_ALL' ? '/' : `/${ post.link.replace('http://174.138.5.191/','') }`}
    activeStyle={ {
      textDecoration: 'none',
      color: 'black'
    }}
  >
    {children}
  </NavLink>
)
 
export default Post