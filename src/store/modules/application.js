export default {

  state: {

    application: localStorage.getItem('app'),
    phoneBlockSize: localStorage.getItem('phoneSize'),
    downloadApp: localStorage.getItem('download')

  },

  getters: {

    getApplication(state) {
      return state.application;
    },

    getSizePhone(state) {
      return state.phoneBlockSize
    },

    canDownload(state) {
      return state.downloadApp
    }
  },

  mutations: {

    setApplication(state, payload) {
      localStorage.setItem('app', payload)
    },

    unsetApplication(state) {
      state.application = {}
      localStorage.removeItem('app')
    },

    setDownload(state, payload) {
      localStorage.setItem('download', payload)
    },

    unsetDownload(state) {
      state.downloadApp = null
      localStorage.removeItem('download')
    },

    setPhoneSize(state, payload) {
      localStorage.setItem('phoneSize', payload)
    },

    updateAppIconSettings(state, payload) {

      let app = JSON.parse(state.application)

      app.app_settings = []

      let settings = JSON.parse(payload)

      settings.forEach( val => {

        app.app_settings.push(val)

      } )

      localStorage.setItem('app', JSON.stringify(app))
    }

  },

  actions: {

    setApp(context) {
      context.commit('setApplication')
    },

  }
}
