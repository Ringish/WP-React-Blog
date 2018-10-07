import React, {Component} from 'react';
import wpAPI from '../api/wp.js';
import { NavLink } from 'react-router-dom'
export default class Header extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			siteInfo:null
		};
	}
	

	componentDidMount() {
		wpAPI.site.getInfo(res => {
			this.setState({siteInfo: res,isLoaded:true})
		});
	}



	render() {
		const { siteInfo } = this.state;

		return (

			<footer className="main-footer">
			<div className="inner-footer">
			<a href="http://sfsu.nu"><img src="../images/sfsu.png" /></a>
			</div>
			</footer>
			
			);
	}
}