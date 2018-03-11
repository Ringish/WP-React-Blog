import React from 'react'
import { NavLink } from 'react-router-dom'
 
const Post = ({ postId, children }) => (
  <NavLink
    to={postId === 'SHOW_ALL' ? '/' : `/${ postId }`}
    activeStyle={ {
      textDecoration: 'none',
      color: 'black'
    }}
  >
    {children}
  </NavLink>
)
 
export default Post