<template>
  <header ref="header">

    <div class="hamburger">
      <i class="fas fa-bars" @click="hideSidebar()"></i>
      <h1 id="title">{{ title }}</h1>
    </div>

    <div class="user-control-block">

      <div class="publish-button" @click="buildApplication()" v-if="currentApp && !$store.getters.canDownload">Publish the app</div>
      <div class="publish-button" @click="downloadApp()" v-if="currentApp && $store.getters.canDownload">Download</div>

      <div class="file-manager-icon" @click="$root.$emit('fmanager::open', true)">
<!--        <i class="far fa-folder-open"></i>-->
      </div>
      <div class="messages-icon new-event"></div>
      <div class="notification-icon new-event"></div>
      <div class="user-avatar" @click="$router.push({name: 'settings'})">
        <img :src="getAvatar(avatar)" alt="" v-if="avatar !== null">
        <i class="far fa-user-circle" v-else></i>
      </div>

    </div>

<!--    <div class="profile-card">-->
<!--      <p class="profile-name">{{ name }} {{ lastName }}</p>-->
<!--      <span>Manager</span>-->
<!--    </div>-->

<!--    <router-link :to="'/dashboard'" tag="div" class="small-rounded-btn top-button">-->
<!--      Dashboard-->
<!--    </router-link>-->

<!--    <div class="small-rounded-btn top-button">Support</div>-->
<!--    <div class="small-rounded-btn top-button">Tour</div>-->
<!--    <div class="small-rounded-btn top-button" @click="$root.$emit('fmanager::open', true)">File Manager</div>-->
<!--    <div class="small-rounded-btn top-button" @click="logout">Exit</div>-->

  </header>
</template>

<script>
// import Language from "./Language";
import {compile, imageUrl, swapSidebar} from "../../helpers/general"
import AWN from 'awesome-notifications'
import { mapGetters } from "vuex";

export default {
  name: "ycms-header",

  // components: {
  //   Language
  // },

  data() {
    return {
      currentApp: this.$store.getters.getApplication ? JSON.parse(this.$store.getters.getApplication) : null,
      avatar: null,
    }
  },

  computed: {

    ...mapGetters(['currentUser', 'getApplication']),

    title() {
      return this.$route.meta.title ? this.$route.meta.title : this.$root.pageTitle
    },
  },

  created() {
    this.checkAvatar()
  },

  methods: {
    logout() {
      this.$store.commit('logout')
      this.$router.push({name: 'sign-in'})
    },

    checkAvatar() {
      if (this.currentUser.extended.length) {
        this.currentUser.extended.forEach(val => {
          if (val.type_id === 2) {
            this.avatar = val.value
          }
        })
      }
    },

    hideSidebar() {
      if (this.$route.name !== 'apps') {
        let sb = this.$store.getters.getSidebar
        swapSidebar(!sb)
      }
    },

    getAvatar(src) {
      return imageUrl(src)
    },

    downloadApp() {

      this.$root.$emit('loading', true)

      axios.get(`/publication/download/${this.currentApp.id}`, {responseType: 'blob'})
        .then((res) => {
            const fileURL = window.URL.createObjectURL(new Blob([res.data]));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'app.apk');
            document.body.appendChild(fileLink);
            this.$root.$emit('loading', false)
            fileLink.click();
        })
    },

    buildApplication() {
      const app = this.getApplication ? JSON.parse(this.getApplication) : null

      if (!app) {
        this.$awn.alert('ERROR')
        return
      }

      axios.get('publication/build')
        .then((res) => {
          this.$awn.success('Building process started')
          axios.get(`/build/${this.currentUser.user_folder}/${app.folder}/${res.data['build_id']}`,
              { baseURL: this.$root.nodeUrl}
          )
        })
        .catch(error => this.$awn.alert(error.response.data.error.message))
    }

  }
}
</script>

<style scoped lang="scss">

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 105px;
  width: 65%;
  margin-left: 240px;
  overflow: hidden;

  .user-control-block {
    width: 25%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    div {
      cursor: pointer;
    }
    .publish-button {
      width: 150px;
      height: 40px;
      color: white;
      background-image: linear-gradient(144deg, #ed59a3 3%, #af2c6d 10%, #e54896 29%);
      font-size: 15px;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      border-radius: 11px;
    }
    .messages-icon {
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-position: 50%;
      background-image: url('~@/assets/img/comment.svg');
    }
    .notification-icon {
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-position: 50%;
      background-image: url('~@/assets/img/Push.svg');
    }
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #ffcce6;
      color: #eb58a3;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-size: 18px;
      img {
        width: 100%;
      }
    }
    .file-manager-icon {
      color: #687c97;
      font-size: 20px;
    }
    .new-event {
      position: relative;
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #eb58a3;
        display: flex;
        right: 5px;
        position: absolute;
        top: 5px;
      }
    }
  }

}
.hamburger {
  width: 45%;
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-left: 35px;
  i {
    cursor: pointer;
  }
}
</style>
