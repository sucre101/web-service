<template>
  <vue-custom-scrollbar class="content-scroll" @ps-scroll-down="tryLoad">
    <div class="list">
      <div class="profile-card" v-for="employee in employees">
        <div class="avatar" @click="goUserProfile(employee)">
          <img :src="getUserAvatar(employee.user.extended)" alt="">
        </div>
        <div class="main">
          <span>Name: {{ employee.user.name }}</span>
          <span>email: {{ employee.user.email }}</span>
          <span>position: Role</span>
        </div>
        <div class="actions-bottom"></div>
      </div>
    </div>
    <div>
      <div class="load-more" v-if="loadMoreBtn" @click="_loadEmployees(true)">Load more...</div>
    </div>
  </vue-custom-scrollbar>
</template>

<script>
import {imageUrl} from "../../../../helpers/general"
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"

export default {
  name: "index",
  title: "My employees",

  components: {
    vueCustomScrollbar
  },

  data() {
    return {
      employees: [],
      loadMoreBtn: false,
    }
  },

  created() {
    this._loadEmployees()
  },

  mounted() {
    this.$on('create::user', () => {
      console.log('create user')
      // this.newEl = true
      // this.$nextTick(() => {
      //   this.$refs.editModal.$refs.editRoleForm.open()
      // })
    })
  },

  methods: {

    goUserProfile($user) {
      console.log($user);
    },

    tryLoad($evt) {
      let _this = $evt.target

      if (_this.scrollTop + _this.clientHeight >= _this.scrollHeight) {
        this.loadMoreBtn = true
      }
    },

    getUserAvatar($extended) {

      $extended.forEach( val => {
        if (val.type_id === 3) {
          return imageUrl(val.value)
        }
      })

      return `/img/tsuker.jpg`
    },

    _loadEmployees($more = false) {

      let link = '/employee/'

      if ($more) {
        link = link + `${this.employees.length}`
      }

      axios.get(link)
        .then((res) => {
          if (res.data.employees.length) {

            for (let i=0; i <= 14; i++) {
              res.data.employees.forEach(val => this.employees.push(val))
            }

          }
        })
        .then(res => this.loadMoreBtn = false)

    }

  }

}
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  flex-wrap: wrap;
  .profile-card {
    display: flex;
    flex-direction: column;
    width: 19%;
    min-height: 200px;
    border: 1px solid #b3bbc8;
    border-radius: 8px;
    margin-bottom: 15px;
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 160px;
      background-color: transparent;
      img {
        width: 70%;
      }
    }
    .main {
      display: flex;
      flex-direction: column;
      font-family: 'SFProText-Light', sans-serif;
      padding-left: 20px;
      font-size: 14px;
      padding-bottom: 15px;
    }
    .actions-bottom {
      display: flex;
      justify-content: flex-start;
      height: 30px;
      border-top: 1px solid #b3bbc8;;
    }
  }
}
.load-more {
  width: 130px;
  height: 38px;
  background-color: red;
  margin: auto;
}
</style>