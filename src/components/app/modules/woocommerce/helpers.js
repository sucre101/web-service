const axios = require("axios")

const modulePages = [
	{name: 'Categories', src: 'some link'},
	{name: 'Products', src: 'some link'},
	{name: 'Settings', src: 'some link'},
	{name: 'orders', src: 'some link'},
]

const baseFilters = {
	'status': 'publish',
	'per_page': 16,
	'categories': []
}

const product = {
	statuses: ['draft', 'pending', 'publish'],
	types: ['simple', 'grouped', 'external', 'variable'],
	catalog_visibility: ['visible', 'catalog', 'search', 'hidden'],
	stock_status: ['instock', 'outofstock', 'onbackorder']
}

const formFieldsForCreate = {

	products: {
		name: 'product',
		postUrl: 'products',
		fields: [
			{name: 'name', placeholder: 'Product name'}
		]
	},

	categories: {
		name: 'category',
		postUrl: 'categories',
		fields: [
			{name: 'name', placeholder: 'Category name'}
		]
	},

	attributes: {
		name: 'attributes',
		postUrl: 'products/attributes',
		fields: [
			{name: 'name', placeholder: 'Product attribute'}
		]
	}

}

const objFilterToUrlParams = ($params) => {
	return Object.entries($params).map(([key, val]) => `${key}=${val}`).join('&')
}

let wooMemory = {

	auth: {

		get: () => {
			return localStorage.getItem('woocommerce:auth')
		},

		set: (payload) => {
			localStorage.setItem('woocommerce:auth', payload)
		},

		remove: () => {
			localStorage.removeItem('woocommerce:auth')
		}

	},

	settings: {

		set: (payload) => {
			localStorage.setItem('woocommerce:settings', JSON.stringify(payload))
		},

		get: () => {
			return JSON.parse(localStorage.getItem('woocommerce:settings'))
		}

	},

	categories: {
		get: () => {
			return localStorage.getItem('woocommerce::categories')
		},
		set: (payload) => {
			localStorage.setItem('woocommerce::categories', JSON.stringify(payload))
		},
		remove: () => {
			localStorage.removeItem('woocommerce::categories')
		}
	},

	request: (url, method, data = null) => {

		return new Promise((res, rej) => {
			axios({
				url: url,
				method: method,
				data: data
			}).then((response) => {
				if (response.data.success) {
					if (response.data.settings) {
						localStorage.setItem('woocommerce:settings', JSON.stringify(response.data.settings))
					}
					res(response.data)
				} else if (!response.data.success && !response.data.auth) {
					localStorage.removeItem('woocommerce:auth')
					localStorage.setItem('woocommerce:settings', JSON.stringify(response.data.settings))
					rej({error: response.data})
				}
			})
		})
	}
}


module.exports = {
	modulePages,
	objFilterToUrlParams,
	baseFilters,
	wooMemory,
	product,
	formFieldsForCreate
}