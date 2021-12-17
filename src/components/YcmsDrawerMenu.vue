<template>
  <div class="drawer-menu">

    <div class="yappix-logo"></div>

    <router-link :to="{ name: 'dashboard' }" tag="a" >
      <div class="menu-entry">
        <div class="icon-container">
          <img src="~@/assets/img/dashboard.png">
        </div>
        <span>Dashboard</span>
      </div>
    </router-link>

    <router-link :to="{ name: 'apps' }" tag="a" >
      <div class="menu-entry">
        <div class="icon-container">
          <img src="~@/assets/img/apps-list.png">
        </div>
        <span>My Apps</span>
      </div>
    </router-link>

    <div class="divider"></div>

    <div v-if="$route.name === 'apps'" class="link-list">
      <span class="title">My apps</span>
      <template v-if="appsList.length">
        <ul>
          <li
              v-for="app in appsList"
              :class="{ 'active-app': current.slug === app.slug }"
              ref="element"
          >
            {{ app.name }}
            <span @click="selectApplication($event, app)">
              <img src="~@/assets/img/edit.png">
            </span>
          </li>
        </ul>
      </template>
    </div>

    <div v-if="app.slug && $route.name !== 'apps'" class="link-list">
      <span class="title">App Manager</span>

      <router-link :to="{ name: 'page-list', params: { slug: current.slug } }" tag="a" >
        <div class="menu-entry">
          <div class="icon-container">
            <img src="~@/assets/img/pages.png">
          </div>
          <span>All pages</span>
        </div>
      </router-link>

      <router-link :to="{ name: 'module-list', params: { slug: current.slug } }" tag="a" >
        <div class="menu-entry">
          <div class="icon-container">
            <img src="@/assets/img/modules.png">
          </div>
          <span>Modules</span>
        </div>
      </router-link>

      <router-link :to="{ name: 'marketplace' }" tag="a" >
        <div class="menu-entry">
          <div class="icon-container">
            <img src="@/assets/img/market.png">
          </div>
          <span>Marketplace</span>
        </div>
      </router-link>

      <router-link :to="{ name: 'users' }" tag="a" v-if="Number(user.role) === 1">
        <div class="menu-entry">
          <div class="icon-container">
            <img src="@/assets/img/users.png">
          </div>
          <span>Users & Roles</span>
        </div>
      </router-link>

    </div>

    <div class="divider"></div>

    <template v-if="sbModules.length" v-for="mod in sbModules">
      <div class="link-list">
        <span class="title">{{ mod.name }}</span>

        <template v-for="page in mod.pages">
          <router-link :to="{ name: 'module-edit', params: { moduleId: mod.id, folder: 'woocommerce' }, query: { tab: page.name.toLowerCase() } }" tag="a" >
            <div class="menu-entry">
              <div class="icon-container">
                <img src="~@/assets/img/pages.png">
              </div>
              <span>{{ page.name }}</span>
            </div>
          </router-link>
        </template>

      </div>
      <div class="divider"></div>
    </template>

    <router-link :to="{ name: 'settings' }" tag="a">
      <div class="menu-entry">
        <div class="icon-container">
          <img src="@/assets/img/settings.png">
        </div>
        <span>Settings</span>
      </div>
    </router-link>

    <div class="btn-sign-out menu-entry" @click="signOut()" ref="signout">
      <span>Sign out</span>
      <i class="fas fa-sign-out-alt"></i>
    </div>

  </div>
</template>

<script>
import {swapSidebar, setHeaders} from "../helpers/general"

export default {
  name: 'ycms-drawer-menu',
  props: ['appName', 'app'],
  data() {
    return {
      act: false,
      appsList: [],
      current: {}
    }
  },

  watch: {
    '$route' (to, from) {
      if (to.name === 'apps') {
        this._getApps()
        swapSidebar(false)
      } else {
        this.appsList = []
      }
    }
  },

  computed: {
    user() {
      return this.$store.getters.currentUser
    },
    sbModules() {
      return JSON.parse(this.$store.getters.getSbModules)
    }
  },

  created() {
    if (this.$route.name === 'apps') {
      swapSidebar(false)
    }
    this.$root.$on('apps::refresh', ($data) => {
      this.appsList.push($data)
      // TODO: Add logic to select created application in CMS
    })
  },

  mounted() {
    this.current = this.$store.getters.getApplication ? JSON.parse(this.$store.getters.getApplication) : {slug: ''}
  },

  methods: {

    _getApps() {

      axios.get('apps')
        .then((res) => {
          this.appsList = [...res.data.apps]
        })
        .then(res => this.$root.$emit('loading', false))

    },

    selectApplication($event, app) {
      this.$store.commit('setApplication', JSON.stringify(app))
      this.$nextTick(() => {
        let elements = $event.srcElement.parentElement.parentElement
        this.$refs.element.forEach(val => {
          val.classList.remove('active-app')
        })
        elements.classList.add('active-app')
        setHeaders(app.slug)
      })
    },

    signOut() {
      this.$store.dispatch('logout')
        .then(res => this.$router.push({name: 'sign-in'}))
    },

  }

}
</script>

<style lang="scss" scoped>

.hidden-sidebar {
  .drawer-menu {
    .yappix-logo {
      width: 40px;
      height: 40px;
      cursor: pointer;
      background-image: url('~@/assets/img/yappix-ex-logo-mini.jpeg');
      background-repeat: no-repeat;
      background-position: -5px -5px;
      display: flex;
      border-radius: 50%;
      background-size: 50px;
      margin: 25px 0 40px 15px;
    }
    .menu-entry {
      span {
        display: none;
      }
      .icon-container {
        img {
          margin-left: 7px;
        }
      }
    }
    .link-list {
      span {
        display: none;
      }
    }
    .divider {
      width: 40%;
      color: #edf2f6;
    }
  }
}

.drawer-menu {
  width: 240px;
  background-color: #0A1018;
  min-height: calc(100vh - 80px);
  transition: margin-left .5s ease-in-out;
  z-index: 99999;
  position: absolute;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .active {
    .menu-entry {
      border-left: 2px solid #8674f4;
      span {
        color: #ed59a3;
      }
      .icon-container {
        margin-left: -2px;
      }
    }
  }
  .divider {
    height: 1px;
    width: 85%;
    border: 1px solid #edf2f6;
    margin: 10px auto;
  }
  .app-icon {
    width: 39px;
    height: 39px;
    border-radius: 30px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
    border: solid 1px #50b109;
    background-color: #d8d8d8;
    margin: 0 10px 0 0;
  }
  .yappix-logo {
    width: 100%;
    height: 105px;
    cursor: pointer;
    background-image: url('~@/assets/img/img-ex-logo.png');
    background-repeat: no-repeat;
    background-position: 10px 30px;
  }
  .link-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    .title {
      margin-bottom: 15px;
      margin-left: 20px;
      color: #999ea3;
      text-transform: uppercase;
      font-size: 12px;
      cursor: default;
    }
    ul {
      margin: 0;
      padding: 0 20px;
      list-style-type: none;
      li {
        color: #f9fbfd;
        font-family: 'SFProText-Light', sans-serif;
        letter-spacing: 1px;
        font-size: 13px;
        display: flex;
        width: 100%;
        position: relative;
        margin-bottom: 10px;
        span {
          position: absolute;
          right: 0;
          font-size: 13px;
          cursor: pointer;
          color: white;
          width: 15px;
          height: 15px;
          display: flex;
          &:hover {
            color: #ed59a3;
          }
          img {
            width: 100%;
          }
        }
        &::before {
          content: '';
          width: 20px;
          height: 20px;
          display: flex;
          background-color: #8674f4;
          border-radius: 3px;
          margin-right: 10px;
        }
        &.active-app {
          span {
            color: #ed59a3;
          }
          &::after {
            position: absolute;
            content: '';
            width: 10px;
            height: 10px;
            display: flex;
            border-radius: 50%;
            border: 1px solid white;
            z-index: 999;
            left: 5px;
            top: 5px;
          }
        }
      }
    }
  }
  .app-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 69px;
    background-color: #0997b1;
    font-size: 12px;
    font-weight: 300;
    color: #ffffff;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    .dropdown {
      text-align: center;
      display: block;
      width: 30px;
      height: 30px;
      line-height: 2.3;
      border-radius: 50%;
      position: absolute;
      right: -12px;
      background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(205,205,116,1) 0%, rgba(0,212,255,1) 100%);
      cursor: pointer;
    }
    .dropdown:hover {
      background: linear-gradient(153deg, rgba(2,0,36,1) 0%, rgba(235,235,0,1) 0%, rgba(0,212,255,1) 100%);
    }
  }
  .menu-entry {
    display: flex;
    align-items: center;
    height: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 300;
    color: #ffffff;
    position: relative;
    z-index: 0;
    cursor: pointer;
    padding: 0 20px;
    font-family: 'SFProText-Light', sans-serif;
    letter-spacing: 0.3px;
    .icon-container {
      width: 25px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 15px;
      }
    }
    &.active::after {
      content: "";
      background-image: linear-gradient(to bottom, #1de9b6, #1dc4e9);
      opacity: 0.05;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
    }
    .dropdown {
      position: absolute;
      top: 23px;
      right: 30px;
    }
  }
  a:hover {
    text-decoration: none;
  }
  .dropdown-box ul {
    list-style-type: none;
    a {
      color: white;
    }
    a:hover {
      color: green;
    }
  }
  .btn-sign-out {
    background-image: linear-gradient(144deg, #ed59a3 3%, #af2c6d 10%, #e54896 29%);
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 40px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    padding: 0 20px;
    justify-content: space-between;
    font-family: 'SFProText-Light', sans-serif;
    margin: 0;
    span {
      width: 80%;
    }
  }
}
</style>
