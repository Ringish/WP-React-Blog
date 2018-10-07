import React, {Component} from 'react';
import {connect} from 'react-redux';

import { NavLink } from 'react-router-dom'

import {getMenu, selectedCategory} from '../actions.js';
   function toggleNav() {
          //e.preventDefault();
          console.log(111);
        }

class Menu extends Component {

  constructor(props) {
    super(props)
    super();
    this.state = {open: false};
  }
  componentDidMount() {
    console.log('hooola')
    console.log(this)
    let { dispatch } = this.props
    console.log('eeee')
    console.log(dispatch)
  }
  componentWillMount() {
    this.props.getMenu();
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.menu,this.props.menu);
    if (!this.props.menu) {
      this.props.getMenu();
    }
  }
  toggleNav(event) {
    //console.log(this.state)
    let open = this.state.open;
    console.log(open)
    this.setState({open: !open})
  }
  
  componentDidUpdate() {
    console.log(this.state)
        //document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;;
      }
      render() {
        const { menu } = this.props
        let open = this.state.open
        let navClass = "nav-closed";
        if (open) {
          navClass = "nav-open";
        }
        console.log(menu)
        return (
          <nav className="main-navigation">
          <button onClick={() => {this.toggleNav()}} className="toggle-menu"></button>
          {menu.length > 0 &&
            <ul  class={"container "+navClass}>
            {menu.map(item => (
              <li>
            <NavLink to={item.url.replace('http://sfsu.nu/foreningsdemokrati/','/')}>
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