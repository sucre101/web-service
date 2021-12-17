<template>
  <div class="apps-list" :class="{ 'scroller' : appsCount }">

    <preloader v-if="$root.loading"/>

    <div class="create" @click="createApp()">Create</div>

    <div class="create-app-block">
      <div class="title">
        <h4>Creating new application</h4>
      </div>
      <div class="main">
        <span>Please enter full informations below</span>

        <div class="input-group">
          <label>
            <input type="text" placeholder="example: appname.app" class="y-input-text" v-model="appName">
          </label>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import YcmsImageUploader from "../YcmsImageUploader"
import Tooltip from '../../components/base/ui/Tooltip'

export default {

  components: {
    YcmsImageUploader,
    Tooltip
  },

  data() {
    return {
      apps: [],
      modules: this.modulesList,
      appToDelete: null,
      appName: null,
      homePageModule: null,
      // menuTemplate: null,
      awaitingIcon: {},
      debug: true,
      step: 1,
      appsList: [],
      modulesList: [],
      appsCount: false,
      // isEmployee: this.$store.getters.isEmployee
    }
  },

  props: {},

  watch: {
    step(val) {
      if (val === 3) {
        return this.createApp()
      }
    }
  },

  created() {
    this.$root.$emit('loading', true)
    this.$parent.currentApp = false
  },

  mounted() {
    window.setTitle(this.$route.meta.title)
  },

  methods: {

    createApp() {
      this.validate()
        .then(res => {
          axios.put('/apps', {appName: this.appName})
            .then((res) => {
              if (res.data.success) {
                this.appName = ''
                this.$root.$emit('apps::refresh', res.data.app)
              }
            })
        })
        .catch(err => {
          this.appName = ''
          this.notifier.warning('Application name must be like this `apple.app`')
        })
    },

    validate() {
      return new Promise((res, rej) => {
        let match = this.appName.split('.')
        if (match.length !== 2 && match[1] !== 'app') rej()
        res()
      })
    }

  }

}
</script>

<style lang="scss" scoped>


.apps-list {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;

  .create {
    width: 135px;
    height: 38px;
    margin: 20px 23px 20px 819px;
    padding: 10.8px 45.5px 9.2px;
    border-radius: 8px;
    background-color: #8674f4;
    font-size: 15px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    letter-spacing: 1px;
    font-family: 'SFProText-Light', sans-serif;
  }

  .create-app-block {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #ffffff;
    box-shadow: 0 10px 15px 0 rgb(202 215 227 / 11%);
    border: solid 1px #edf2f6;
    border-radius: 8px;
    .title {
      width: 100%;
      display: flex;
      border-bottom: 1px solid #edf2f6;
      padding: 10px 20px;
      h4 {
        color: #222b45;
        font-size: 20px;
        margin-bottom: 0;
      }
    }
    .main {
      width: 100%;
      display: flex;
      padding: 10px 20px;
      flex-direction: column;
      span {
        color: #687c97;
        font-size: 15px;
        padding: 15px 0;
        margin-bottom: 15px;
      }
      .input-group {
        width: 35%;
        input {
          width: 100%;
          border-radius: 8px;
          border: solid 1px #edf2f6;
          color: #687c97;
        }
        input::-moz-placeholder {
          font-family: 'SFProText-Light', sans-serif;
          color: #c5cee0;
        }
        input::-webkit-input-placeholder {
          font-family: 'SFProText-Light', sans-serif;
          color: #c5cee0;
        }
      }
    }
  }

  .apps-list-item:hover {
    border: solid 3px rgba(9, 137, 204, 0.73);
  }

  .pagination {
    display: flex;
    width: 30%;
    margin: auto;
    align-items: center;
    justify-content: space-evenly;

    h2 {
      margin-bottom: 3px;
    }
  }
}

.scroller {
  overflow-y: scroll;
  height: 100%;
}

.apps-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #F5F5F5;
  border-radius: 10px;
}

.apps-list::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5;
}

.apps-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #FFF;
  background-image: -webkit-linear-gradient(top,
      #0989cc,
      #2696d1 53%,
      #0989cc);
}


.actions {
  display: block;
  color: #0997b1;
  margin-left: 22px;
  min-width: 100px;
}

.required-text {
  color: #b40000;
  text-align: left;
  font-size: 14px;
}

.loader {
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: 50px auto;
}

.leftHalf, .rightHalf, .spinner {
  top: 0;
  position: absolute;
  width: 50%;
  height: 100%;
}

.leftHalf {
  left: 0;
  background: #fff;
  z-index: 3;
  opacity: 1;
  -webkit-animation: showHide 2s infinite steps(1, end);
  border-radius: 100% 0 0 100%/ 50% 0 0 50%;
}

.rightHalf {
  right: 0;
  background: #0997b1;
  z-index: 1;
  opacity: 0;
  -webkit-animation: showHide 2s infinite steps(1, end) reverse;
  border-radius: 0 100% 100% 0/ 0 50% 50% 0;
}

.spinner {
  overflow: hidden;
  left: 0;
  background: #0997b1;
  -webkit-animation: spin 2s linear infinite;
  -webkit-transform-origin: center right;
  z-index: 2;
  border-radius: 100% 0 0 100%/ 50% 0 0 50%;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes showHide {
  0% {
    opacity: 1;
  }

  50%, 100% {
    opacity: 0;
  }
}

.icon-content {

  align-items: initial;
  flex: 1;
  height: auto;

  .right-image {
    width: 50%;
    height: 205px;
    float: right;
  }

  .left-image {
    width: 50%;
    height: 205px;
    float: left;
  }
}
</style>
