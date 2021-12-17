<template>
  <div class="users-roles">
    <div class="actions-block">
      <div class="button add-user" @click="sendEvent">Add element</div>
    </div>
    <div class="profiles-list">
      <h4>Users & Roles</h4>

      <PageNavigation
          :component-list="tabScreens"
          :return-component="true"
          @component="setComponent"
      />

      <div class="main-block">
        <component :is="component" ref="custom"/>
      </div>

    </div>
  </div>
</template>

<script>
import PageNavigation from "../../base/PageNavigationTab"
import Users from './users/Index'
import Employees from './employees/Index'
import Roles from './roles/Index'

export default {
  name: "index",

  components: {
    PageNavigation, Users, Employees, Roles
  },

  data() {
    return {
     component: Employees,
     tabScreens: [Employees, Users, Roles],
    }
  },

  mounted() {
    window.setTitle(this.$route.meta.title)
  },

  methods: {
    setComponent($component) {
      this.component = $component
    },
    sendEvent() {
      switch (this.component.title) {
        case "Roles-Positions":
          this.$refs.custom.$emit('create::role')
          break
        case "My employees":
          this.$refs.custom.$emit('create::user')
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
.users-roles {
  width: 100%;
  display: flex;
  flex-direction: column;
  .actions-block {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .button {
      width: 135px;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      border-radius: 8px;
      margin-right: 20px;
      cursor: pointer;
      &.add-user {
        background-color: #8674f4;
      }
    }
  }
  .profiles-list {
    display: flex;
    height: 70px;
    background-color: #ffffff;
    border: 1px solid #edf2f6;
    border-bottom: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 25px;
    h4 {
      width: 35%;
    }
    .page-nav-main {
      width: 59%;
    }
    .main-block {
      background-color: #ffffff;
      min-height: 350px;
      border-top: 1px solid #edf2f6;
      width: 100%;
      max-height: 650px;
      display: flex;
    }
  }
}
</style>