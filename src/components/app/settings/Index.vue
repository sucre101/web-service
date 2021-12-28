<template>
  <div class="box-list">

    <div class="top-header">
      <PageNavigation
          :component-list="tabScreens"
          :return-component="true"
          @component="setComponent"
      />
    </div>
    <div class="main-block">
      <component :is="component" ref="currentComponent"/>
    </div>
  </div>
</template>

<script>
import PageNavigation from '../../base/PageNavigationTab'
import MainTab from "./MainTab"
import PaymentTab from "./payment/Index"
import LogoTab from "./LogoTab"
import Company from "./company/Index"

export default {
  name: "index",

  components: {
    PageNavigation, MainTab, PaymentTab, LogoTab, Company
  },

  data() {
    return {
      currentIndex: 0,
      tabs: [
        { title: 'Global' },
        { title: 'Resources' },
        // { title: 'Payment' },
        // { title: 'Company' },
      ],
      component: MainTab,
      tabScreens: [
        MainTab, LogoTab, PaymentTab, Company
      ]
    }
  },

  mounted() {
    window.setTitle('Application settings')
  },

  created() {
    if (this.$route.query.hasOwnProperty('tab')) {
      let currentTab = this.$route.query.tab;

      let currentTabIndex = this._.findIndex(this.tabs, (v) => {
        return v.title.toLocaleLowerCase() === currentTab;
      })

      if (currentTabIndex >= 0) {
        this.currentIndex = currentTabIndex
      }
    }
  },

  methods: {

    setComponent($component) {
      this.component = $component
    },


    changeView(view) {
      this.currentIndex = view
      this.$router.replace(
          { query: { tab: this.tabs[view].title.toLocaleLowerCase() }}
      )
    },
  }
}
</script>

<style scoped>

</style>
