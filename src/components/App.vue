<template>
  <div>

    <div class="all-but-phone" v-if="isLoggedIn" :class="{ 'hidden-sidebar': getSidebar, 'dark-theme': darkMode }">

      <ycms-drawer-menu
          :app="app ? app : {}"
      />

      <YcmsHeader
          :user="currentUser"
      />

      <div id="main-content">

        <div class="settings-block">
          <router-view></router-view>
        </div>

      </div>

      <FileManager v-if="$root.openManager" ref="FileManager"/>

      <Emulator v-if="emulator" ref="emulator"/>

      <div class="emulator-btn" @click="swapEmulator()">
        Start emulator
      </div>

<!--      <Reference ref="reference"/>-->

      <!--      <ycms-phone-block-->
      <!--        v-if="isLoggedIn && currentApp"-->
      <!--        _host="http://localhost:8100/"-->
      <!--        :size="getSizePhone"-->
      <!--      ></ycms-phone-block>-->

    </div>

    <div id="auth" v-else>
      <router-view></router-view>
    </div>

  </div>

</template>

<script>

import { mapGetters } from 'vuex'
import YcmsHeader from "./base/YcmsHeader"
import YcmsDrawerMenu from "./YcmsDrawerMenu"
import FileManager from "@/components/base/filemanager/FileManager"
import { setHeaders } from "../helpers/general";
import Emulator from "./Emulator";
// import Reference from "./base/Reference";


export default {
  name: "App",

  components: {
    Emulator,
    YcmsDrawerMenu,
    YcmsHeader,
    FileManager,
    // Reference
  },

  data() {
    return {
      app: {},
      currentApp: false,
      emulator: false
    }
  },

  computed: {
    ...mapGetters(['currentUser', 'isLoggedIn', 'getApplication', 'isDarkTheme']),

    getSidebar() {
      return this.$store.getters.getSidebar
    },

    darkMode() {
      return this.isDarkTheme
    },
  },

  created() {

    if (!this.isLoggedIn) {
      this.$store.commit('logout')
    }

    this.app = this._.cloneDeep(JSON.parse(this.getApplication))

    if (!this._.isEmpty(this.getApplication)) {
      setHeaders(this.app.slug)
    }

    // if (!this.getApplication && this.currentUser) {
    //   this.$router.push('/dashboard')
    // }

    this.$root.$on('app::set', (data) => {
      this.app = this._.cloneDeep(data)
      this.$children[0].currentApp = this._.cloneDeep(this.app)
    })

    this.$root.$on('app::unset', () => {
      this.app = {}
      // this.currentApp = false
      // this.$children[0].currentApp = this._.cloneDeep({})
    })

    this.$root.$on('fmanager::open', (data) => {
      this.$root.openManager = data

      if (data) {
        this.$nextTick(() => {
          this.$refs.FileManager.$children[0].open()
        })
      }

    })

    this.$root.$on('emulate', (url) => {
      this.emulator = true
    })

    this.$root.$on('loading', (res) => {
      this.$root.loading = res
    })

  },

  updated() {
    if (this.$route.name !== 'login') {
      // this.$refs.reference.setPage(this.$route.name.replace('-', '_'))
    }
  },

  methods: {

    swapEmulator() {

      this.emulator = true

      this.$nextTick(() => {
        switch (this.$route.params.folder) {
          case 'woocommerce':
            this.$refs.emulator.url = "https://wp.yappix.studio"
            break
        }
      })

    }

  }

}
</script>

<style scoped>
.emulator-btn {
  width: 150px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  color: white;
  background: darkblue;
  position: absolute;
  right: 80px;
  top: 20px;
  cursor: pointer;
}
</style>
