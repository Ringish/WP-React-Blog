import wpAuth from "../api/auth/wp.js"

const baseUrl = wpAuth.baseUrl

const wpAPI = {
	site: {
		getInfo(handleResponse) {
			fetch(baseUrl)
				.then(res => res.json())
				.then(result => {
					handleResponse(result)
				})
		},
		topMenuUrl: `${baseUrl}wp-api-menus/v2/menu-locations/top`
	},
	posts: {
		listUrl: `${baseUrl}wp/v2/posts&_embed&per_page=100`,
		getList(handleResponse) {
			fetch(`${baseUrl}wp/v2/posts`).then(res => res.json())
		},
		singleUrl: `${baseUrl}wp/v2/posts&_embed=true&slug=`,
		getSingle(id, handleResponse) {
			fetch(baseUrl + "wp/v2/posts&_embed=true&slug=" + id)
				.then(res => res.json())
				.then(result => {
					handleResponse(result)
				})
		}
	},
	pages: {
		listUrl: `${baseUrl}wp/v2/pages&_embed`,
		getList(handleResponse) {
			fetch(`${baseUrl}wp/v2/pages`).then(res => res.json())
		},
		singleUrl: `${baseUrl}wp/v2/pages&_embed=true&slug=`,
		getSingle(id) {
			fetch(`${baseUrl}/wp/v2/pages/${id}`)
				.then(res => res.json())
				.then(result => {
					handleResponse(result)
				})
		}
	},
	categories: {
		listUrl: `${baseUrl}wp/v2/categories`,
		getList(handleResponse) {
			fetch(`${baseUrl}wp/v2/categories`).then(res => res.json())
		}
	},
	badges: {
		listUrl: `${baseUrl}wp/v2/badge&per_page=100`
	}
}

export default wpAPI
