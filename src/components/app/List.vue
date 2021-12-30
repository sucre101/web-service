<template>
  <div class="apps-list" :class="{ 'scroller' : appsCount }">

    <div class="create" @click="createApp()">Create</div>

    <div class="create-app-block">
      <div class="title">
        <h4>Creating new application</h4>
      </div>
      <div class="main">

        <div>
          <span>Please enter full informations below</span>

          <div class="input-group">
            <label>
              <input type="text" placeholder="App Name*" class="y-input-text" v-model.trim="appModel.name">
            </label>
          </div>

          <div class="input-group">
            <span>Icon</span>
            <div >
              <input type="file" @change="uploadFile" ref="icon" class="file_input"/>
              <div @drop="dragFile" class="drop-block" @dragover.prevent @drop.prevent @click="$refs.icon.click()">
                <img src="@/assets/img/group-folder.png">
                Select or Drop your files here
              </div>
            </div>
            <div class="notify">
              <span v-if="!rFile.length" class="warning">
                <i class="fas fa-exclamation-circle"></i>
                Not file selected
              </span>
              <span v-else class="done">
                <i class="fas fa-check"></i>
                File selected
              </span>
            </div>
          </div>
        </div>

        <div>
          <span>Description</span>
          <textarea placeholder="Type something..." v-model.trim="appModel.description"></textarea>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import YcmsImageUploader from "../YcmsImageUploader"
import Tooltip from '../../components/base/ui/Tooltip'
import {mapGetters} from "vuex";

const WIDTH = 1024;
const HEIGHT = 1024;

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
      appModel: {
        name: '',
        description: ''
      },
      appsList: [],
      modulesList: [],
      appsCount: false,
      rFile: [],
      image:{
        size:'',
        height:'',
        width:''
      },
    }
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  created() {
    this.$parent.currentApp = false
  },

  mounted() {
    window.setTitle(this.$route.meta.title)
  },

  methods: {

    createApp() {

      this.validate()
        .then( res => {
          let form = new FormData()
          form.append('file', this.$refs.icon.files[0])
          form.append('name', this.appModel.name)
          form.append('description', this.appModel.description)

          this.$awn.async(
              axios.post('/apps', form, { headers: {'Content-Type': 'multipart/form-data'} }),
              response => {
                if (response.data.success) {
                  this.$root.$emit('apps::refresh', response.data.app)
                  this.$awn.success(`Application added ${response.data.app.name}`)
                  this.appModel = {}
                  this.rFile = []
                } else {
                  this.$awn.alert(response.data.error)
                }
              },
              error => {
                this.$awn.alert(error.response.data.errors.name[0])
              }
          )
        })
        .catch(err => {
          this.appModel = ''
          this.$awn.warning('Application name must be like this `apple.app`')
        })
    },

    validate() {
      return new Promise((res, rej) => {
        if (! /^[a-z0-9]+$/.test(this.appModel.name)) {
          this.appModel.name = ''
          rej()
        }
        if (!this.$refs.icon.files.length) rej()
        res()
      })
    },

    validateIcon(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = evt => {
        let img = new Image();
        img.onload = () => {
          this.image.width = img.width;
          this.image.height = img.height;
          if (this.image.width !== WIDTH && this.image.height !== HEIGHT) {
            this.$awn.alert('Another resolution icon')
            this.rFile = []
            return false
          }
        }
        img.src = evt.target.result;
      }
    },


    uploadFile(e) {
      this.rFile = e.target.files;
      this.validateIcon(this.rFile[0])
    },

    dragFile(e) {
      this.rFile = e.target.files;
      this.validateIcon(this.rFile[0])
    }

  }

}
</script>

<style lang="scss" scoped>
*:focus {
  outline: 0;
}
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
      flex-direction: row;
      > div {
        width: 40%;
        display: flex;
        flex-direction: column;
        textarea {
          border: none;
          resize: none;
          width: 100%;
          height: 350px;
        }
        textarea::placeholder {
          color: #c5cee0;
        }
      }
      span {
        color: #687c97;
        font-size: 15px;
        padding: 15px 0;
      }
      .input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        label {
          width: 70%;
        }
        span {
          color: #687c97;
          font-size: 15px;
          padding: 15px 0;
        }
        .notify {
          margin-top: 20px;
          .warning {
            i {
              color: red;
            }
          }
          .done {
            i {
              color: green;
            }
          }
        }
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
        .file_input {
          display: none;
        }
        .drop-block {
          background: #f9fbfd;
          border-radius: 8px;
          border: 1px dotted #b5e0ff;
          width: 159px;
          display: flex;
          flex-direction: column;
          color: #c5cee0;
          font-size: 12px;
          justify-content: center;
          align-items: center;
          padding: 20px 25px;
          text-align: center;
          line-height: 1.2;
          cursor: pointer;
          img {
            width: 35%;
            margin-bottom: 10px;
          }
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
