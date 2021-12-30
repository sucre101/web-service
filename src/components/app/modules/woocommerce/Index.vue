<template>
  <div>
    <div class="box-list">
      <template v-if="locAuth">
        <div class="top-header">
          <PageNavigation
              :component-list="tabScreens"
              :return-component="true"
              @component="setComponent"
          />
        </div>
        <div class="main-block">
          <component :is="component" v-if="!showFilters" ref="currentComponent"/>
        </div>
      </template>

      <div class="bottom-footer filters" v-if="locAuth">

        <div class="btn-filters" ref="filterBtn"  @click="openFilterBar()">
          <i class="fas fa-filter"></i>
        </div>

        <div class="add-button" @click="addItemButton()">
          <i class="fas fa-plus"></i>
        </div>

      </div>

      <create-item-form v-if="createElem" :form="createElem" @complete="completeAdding"/>

      <sweet-modal
          class="modal"
          ref="wooAuth"
          width="550"
          overlay-theme="dark"
          hide-close-button blocking
      >
        <h4>Auth for WooCommerce Api</h4>

        <div class="this-form">
          <div class="input-group">
            <input type="url" class="y-input-text" placeholder="https://example.com" v-model.trim="authForm.src">
          </div>
          <div class="input-group">
            <input type="text" class="y-input-text" placeholder="consumer key" name="consumer_key" v-model.trim="authForm.consumerKey">
          </div>
          <div class="input-group">
            <input type="text" class="y-input-text" placeholder="consumer secret" name="consumer_secret" v-model.trim="authForm.consumerSecret">
          </div>
          <div class="btn-action green" @click="tryConnect">Try Connect</div>
        </div>

      </sweet-modal>

      <filters :filter-data="filters" v-show="showFilters" @apply="completeFilter"/>

    </div>

  </div>

</template>

<script>
import PageNavigation from "../../../base/PageNavigationTab"
import Category from "./Categories/Index"
import Product from "./Products/Index"
import Tags from "./ProductTags/Index"
import Attribute from './ProductAttributes/Index'
import Orders from './Orders/Index'
import {baseFilters, formFieldsForCreate, wooMemory as WOO} from "./helpers"
import filters from "./filters"
import CreateItemForm from "./CreateItemForm";

export default {
  name: "index",

  components: {
    Category, Product, PageNavigation, Attribute, Orders, filters, CreateItemForm
  },

  data() {
    return {
      moduleId: null,
      tabScreens: [
        Category, Product, Attribute, Tags, Orders
      ],
      currentScreen: 0,
      component: Category,
      authForm: {
        src: null,
        consumerKey: null,
        consumerSecret: null,
      },
      loading: false,
      filters: baseFilters,
      showFilters: false,
      locAuth: this.auth,
      createElem: null,
    }
  },

  created() {
    window.setTitle('WooCommerce module')
    this.moduleId = Number(this.$route.params.moduleId)
    this.$root.$emit('loading', true)

    if (this.$route.query.hasOwnProperty('tab')) {
      let currentTab = this.$route.query.tab;

      let currentTabIndex = this._.findIndex(this.tabScreens, (v) => {
        return v.title.toLocaleLowerCase() === currentTab;
      })

      if (currentTabIndex >= 0) {
        this.currentScreen = currentTabIndex
        this.component = this.tabScreens[this.currentScreen]
      }

    }

    this.$root.$children[0].emulatorButton = true
  },

  destroyed() {
    this.$root.$children[0].emulatorButton = false
    this.$root.$emit('emulate', false)
  },

  computed: {
    auth() {
      return WOO.auth.get() ? WOO.auth.get() : false
    },
  },

  watch: {

    auth(o, m) {
      console.log(o, m)
    }

  },

  mounted() {
    if (!this.locAuth) {
      this.moduleAuth()
    }
  },

  methods: {

    moduleAuth() {
      WOO.request(`woocommerce/${this.moduleId}/check`, 'GET')
        .then((res) => {
          this.locAuth = true
          WOO.auth.set(this.locAuth)
        })
        .catch((err) => {
          this.$root.$emit('loading', false)
          this.$refs.wooAuth.open()
        })
    },

    tryConnect() {
      this.$refs.wooAuth.close()
      this.$root.$emit('loading', true)
      axios.post(`woocommerce/${this.moduleId}/set`, this.authForm)
        .then((res) => {
          if (res.data.success) {
            this.locAuth = true
            WOO.auth.set(this.locAuth)
            this.$root.$emit('loading', false)
            this.$refs.wooAuth.close()
          } else {
            this.$refs.wooAuth.open()
            this.$root.$emit('loading', false)
          }
        })

    },

    setComponent($component) {
      this.component = $component
    },

    openFilterBar() {
      this.showFilters = true
    },

    completeFilter($data) {
      this.filters = $data
      this.showFilters = false
    },

    completeAdding($data)  {
      console.log($data)
    },

    addItemButton() {
      let title = this.$refs.currentComponent.$options.title ? this.$refs.currentComponent.$options.title : ''
      if (formFieldsForCreate.hasOwnProperty(title)) {
        this.createElem = formFieldsForCreate[title]
      }
    }

  }
}
</script>

<style scoped lang="scss">
.top-header {
  .page-nav {
    display: flex;
    height: 100%;
  }
}
.bottom-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .button {
    background-color: #8674f4;
    color: white;
    cursor: pointer;
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0 10px 20px;
    border-radius: 8px;
  }
  .btn-filters {
    cursor: pointer;
    margin-left: 20px;
    color: #0e88cc;
    &.hover {
      display: none;
    }
  }
  .add-button {
    cursor: pointer;
    margin-right: 20px;
    color: #0e88cc;
  }
}
.main-block {
  > div {
    width: 100%;
  }
}
.this-form {
  display: flex;
  width: 75%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: auto;
  .input-group {
    margin-bottom: 10px;
  }
}
</style>