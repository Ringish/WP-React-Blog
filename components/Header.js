import React, {Component} from 'react';
import wpAPI from '../api/wp.js';
import Menu from '../components/Menu.js'
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
				<div>
			<h1>Föreningsdemokrati</h1>
			<Menu></Menu>
			</div>
				);
			}
	}