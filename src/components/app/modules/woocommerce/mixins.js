import {wooMemory} from "./helpers"

export default {

	data() {
		return {
			list: [],
			allData: [],
			item: null
		}
	},

	methods: {

		_loadList(url) {
			return new Promise(resolve => {
				wooMemory.request(url, 'GET')
					.then((res) => {
						this.list = this._.cloneDeep(res.list)
					})
					.then(res => this.$root.$emit('woo::load', false))
			})
		},

		_loadItem(url) {
			return new Promise(resolve => {
				wooMemory.request(url, 'GET')
					.then((res) => {
						if (res.data) {
							this.allData = this._.cloneDeep(res.data)
						} else {
							this.item = this._.cloneDeep(res.item)
						}
					})
					.then(r => resolve(this.item ? this.item : this.allData))
					.then(res => this.$root.$emit('woo::load', false))
			})
		},

		_removeItem(url) {
			return new Promise(resolve => {
				wooMemory.request(url, 'DELETE')
					.then(r => resolve(r))
			})
		},

		_editView(element, tab, itemName) {
			this.$parent.edit = true
			let query = { tab: tab }
			query[itemName] = element.id
			this.$router.replace({ query: query })
		},

		_updateItem(url, data) {
			return new Promise(resolve => {
				wooMemory.request(url, 'PATCH', data)
					.then((res) => {
						resolve(res)
					})
			})
		}
	}
}