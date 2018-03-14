import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getMenu} from '../actions.js';


class Menu extends Component {
  componentWillMount() {
    this.props.getMenu();
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.menu,this.props.menu);
    if (this.props.menu !== nextProps.menu) {
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

          <div>

          </div>
          );
        }
      }


function mapStateToProps(state) {
    const {menu} = getMenu() || { menu: [] }
    return {menu}
}

export default connect(mapStateToProps, {getMenu})(Menu)