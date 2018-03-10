import React, {Component} from 'react';
import wpAPI from '../api/wp.js';
export default class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			items: [],
			siteInfo:null
		};
	}
	

	componentDidMount() {
		wpAPI.site.getInfo(res => {
			this.setState({siteInfo: res,isLoaded:true})
		});
		wpAPI.posts.getList(res => {
			this.setState({items: res})
		});


	}



	render() {
		const { isLoaded, items, siteInfo } = this.state;

		if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (

			<ul>
			<h1>{siteInfo.name}</h1>
			{items.map(item => (
				<li key={item.title.rendered}>
				{item.title.rendered} {item.date}
				</li>
				))}
				</ul>
				);
			}
		}
	}