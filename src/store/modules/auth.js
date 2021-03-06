import {getLocalUser} from "@/helpers/auth";

const user = getLocalUser()

export default {
  state: {
    currentUser: user,
    isLoggedIn: !!user,
    loading: false,
    auth_error: null,
    dark_theme: !!localStorage.getItem('dark-mode')
  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    currentUser(state) {
      return state.currentUser;
    },
    authError(state) {
      return state.auth_error;
    },
    isEmployee(state) {
      return !!state.currentUser.has_owner
    },
    isDarkTheme(state) {
      return state.dark_theme
    }
  },
  mutations: {
    login(state) {
      state.loading = true
      state.auth_error = null
    },
    loginSuccess(state, payload) {
      state.auth_error = null
      state.isLoggedIn = true
      state.loading = false
      state.currentUser = Object.assign({}, payload.user, {token: payload.access_token})

      localStorage.setItem("user", JSON.stringify(state.currentUser))
    },
    loginFailed(state, payload) {
      state.loading = false
      state.auth_error = payload.error
    },
    logout(state) {

      Object.keys(localStorage).forEach(val => {
        localStorage.removeItem(val)
      })

      state.isLoggedIn = false;
      state.currentUser = null;
    }
  },
  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          context.commit('logout')
          res()
        }, 1000)
      })
    }
  }
};
