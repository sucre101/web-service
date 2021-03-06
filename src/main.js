require('./util');
import Vue from 'vue'
import router from "./router";
import store from './store/index'

import { YcmsLocalStorage } from './ycms-local-storage'
import SweetModal from 'sweet-modal-vue/src/plugin'
import { ToggleButton } from 'vue-js-toggle-button'
import vueDebounce from 'vue-debounce'
import InputTag from 'vue-input-tag'
import App from './components/App'
import * as VueGoogleMaps from 'vue2-google-maps'
import { initialize } from './helpers/general';
import _ from 'lodash'
import axios from 'axios'
import '@/assets/app.scss'
import {active} from "./vue-directives"
import AWN from "awesome-notifications"
import VueLuxon from "vue-luxon"

Vue.config.devtools = true;

window.axios = axios
axios.defaults.baseURL = process.env.VUE_APP_URL

let $awnOptions = {
  position: 'top-right',
  messages: {
    "async-block": "We are trying to authorize you",
  }
}
Vue.prototype.$awn = new AWN($awnOptions)

Vue.prototype.locStor = new YcmsLocalStorage

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCe9h5Je-kOI5ZChchZ0_Y4g0Rw9783KBU',
    libraries: 'places',
  },
  installComponents: true
});

Vue.use(SweetModal)
Vue.use(VueLuxon)
Vue.use(vueDebounce, {listenTo: ['input', 'keyup']})
Vue.prototype._ = _

Vue.component('preloader', require('./components/base/ui/Preloader.vue').default)
Vue.component('vue-color', require('vue-color/src/components/Chrome.vue').default)
Vue.component('ToggleButton', ToggleButton)
Vue.component('input-tag', InputTag)
Vue.directive('active', active)

Vue.directive('scroll', {
  bind(el, binding) {
    el.classList.add(binding.value)
  }
})

Vue.directive('click-outside', {
  bind(el, binding) {
    el.addEventListener('click', e => e.stopPropagation());
    document.body.addEventListener('click', binding.value);
  },
  unbind(el, binding) {
    document.body.removeEventListener('click', binding.value);
  }
});

// Vue.directive('css', (el, binding) => {
//
//   let _result = el.style = ''
//
//   for (let style in binding.value) {
//
//     let _thatStyle = binding.value[style]
//
//     switch (style) {
//       case 'border-radius':
//         _thatStyle = parseInt(binding.value[style]) + 'px'
//         break
//     }
//
//     _result += `${style}: ${_thatStyle};`
//   }
//
//   el.style = _result
// })

String.prototype.capitalize = () => {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

initialize(store, router);

new Vue({
  components: {
    App
  },
  router,
  store,
  data: {
    pageTitle: null,
    openManager: false,
    baseUrl: process.env.VUE_APP_URI,
    nodeUrl: process.env.VUE_APP_NODE,
    enableDarkTheme: false,
    loading: false,
  },
  render: h => h(App),
}).$mount('#app')

