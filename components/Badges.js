import React, {Component} from 'react';
import {connect} from 'react-redux';

import { NavLink } from 'react-router-dom'

import {getBadges, selectBadges} from '../actions.js';


class Badges extends Component {

  constructor(props) {
    super(props)
    super();
    this.state = {open: false};
  }
  componentDidMount() {
    const { dispatch } = this.props
    console.log(dispatch)
  }
  componentWillMount() {
    this.props.getBadges();
  }
  
  componentWillReceiveProps(nextProps) {
    if (!this.props.badges) {
      this.props.getBadges();
    }
  }

  toggleFilter(event) {
    //console.log(this.state)
    let open = this.state.open;
    console.log(open)
    this.setState({open: !open})
  }
  
  componentDidUpdate() {
    console.log(1)

        //document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;;
      }
      render() {
        const { badges, dispatch, selectedBadge } = this.props
        let open = this.state.open
        let filterClass = "filter-closed";
        if (open) {
          filterClass = "filter-open";
        }
        console.log(badges)
        console.log('ellooo'+this.props)
        console.log(this.props)
        return (
          <nav className={"badges container "+filterClass}>
          {badges.length > 0 &&
            <ul>
            <label onClick={() => {this.toggleFilter()}}>Filtrera</label>
            <li>
              <NavLink onClick={() => {this.toggleFilter()}} to="">Alla</NavLink>
              </li>
            {badges.map(item => (
              <li>
              <NavLink onClick={() => {this.toggleFilter()}} className={is_selected(item,selectedBadge)} to={"#badge" + item.id}><img  src={item.badge_meta} /></NavLink>
              </li>
              ))}
              </ul>}
              </nav>
              );
            }
          }
          function is_selected(badge,selectedBadge) {
            if (selectedBadge == "#badge"+badge.id) {
              return 'selected';
            }
          }


          function mapStateToProps({badges}) {
            return {badges};
          }

          export default connect(mapStateToProps, {getBadges})(Badges)