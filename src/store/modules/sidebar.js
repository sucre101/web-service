/*
  barModules structure = [
    {
      moduleId,
      userModuleId,
      pages: [
        { name: '...', src: 'link to page' }
      ]
    }
  ]
 */

import {modulePages} from "../../components/app/modules/woocommerce/helpers";

export default {
  state: {
    sidebar: localStorage.getItem('sidebar'),
    barModules: localStorage.getItem('barModules')
  },
  getters: {
    getSidebar(state) {
      if (state.sidebar === 'true') {
        return true
      } else if (state.sidebar === 'undefined') {
        return false
      } else {
        return false
      }
    },
    getSbModules(state) {
      return state.barModules
    },
  },
  mutations: {

    insertModule(state, payload) {

      let _this = JSON.parse(state.barModules)

      if (_this === null || _this === 'undefined') {

        _this = []
      }

      payload.forEach(val => {
        let item = {}
        item.name = val.module.name
        item.moduleId = val.moduleId
        item.id = val.id
        item.pages = []

        modulePages.forEach(page => {

          item.pages.push(page)

        })

        _this.push(item)
      })

      localStorage.setItem('barModules', JSON.stringify(_this))

    }

  }
}