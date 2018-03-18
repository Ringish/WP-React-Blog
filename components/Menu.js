import React, {Component} from 'react';
import {connect} from 'react-redux';

import { NavLink } from 'react-router-dom'

import {getMenu} from '../actions.js';


class Menu extends Component {
  componentWillMount() {
    this.props.getMenu();
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.menu,this.props.menu);
    if (!this.props.menu) {
      this.props.getMenu();
    }
  }
  
  componentDidUpdate() {
        //document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;;
      }
      render() {
        const { menu } = this.props
        console.log(menu)
        return (
          <nav className="main-navigation">
          {menu.length > 0 &&
            <ul>
            {menu.map(item => (
              <li>
            <NavLink to={item.url.replace('http://174.138.5.191/','/')}>
              {item.title}
              </NavLink>
              </li>
              ))}
            </ul>}
            </nav>
            );
          }
        }


        function mapStateToProps({menu}) {
          return {menu};
        }

        export default connect(mapStateToProps, {getMenu})(Menu)