<template>
  <div>
    Users
  </div>
</template>

<script>
import {imageUrl} from "../../../../helpers/general"
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"

export default {
  name: "index",
  title: "Users",

  components: {
    vueCustomScrollbar
  },

  data() {
    return {
      users: [],
      loadMoreBtn: false
    }
  },

  mounted() {
    this._loadUsers()
  },

  methods: {
    _loadUsers($more = false) {
      let link = '/users/'

      if ($more) {
        link = link + `${this.users.length}`
      }

      axios.get(link)
          .then((res) => {
            if (res.data.users.length) {
              res.data.users.forEach(val => this.users.push(val))
            }
            console.log(this.users)
          })
          .then(res => this.loadMoreBtn = false)
    }
  }
}
</script>

<style scoped>

</style>