import React, { Component } from "react"
import wpAPI from "../api/wp.js"
import { NavLink } from "react-router-dom"
import Menu from "../components/Menu.js"
export default class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			siteInfo: null
		}
	}

	componentDidMount() {
		wpAPI.site.getInfo(res => {
			console.log("yayaya")
			console.log(res)
			this.setState({ siteInfo: res, isLoaded: true })
		})
		wpAPI.posts.getSingle("slider", res => {
			console.log("slider")
			var temp = document.createElement("DIV")
			temp.innerHTML = res[0].content.rendered
			var imgs = temp.getElementsByTagName("img")
			var srcList = []
			for (var i = 0; i < imgs.length; i++) {
				srcList.push(imgs[i].src)
			}
			this.setState({ sliderImgs: srcList })
		})
	}

	slider(sliderImgs) {
		if (sliderImgs) {
			var index = 0
			if (sliderImgs.length > 0) {
				setInterval(function() {
					if (index == sliderImgs.length) {
						index = 0
					}
					document.getElementById("main-header").style.backgroundImage =
						'url("' + sliderImgs[index] + '")'
					index++
				}, 10000)
			}
		}
	}

	render() {
		const { siteInfo, sliderImgs } = this.state
		var style = {
			backgroundImage: 'url("/images/header.jpg")'
		}
		this.slider(sliderImgs)

		return <div />
	}
}
