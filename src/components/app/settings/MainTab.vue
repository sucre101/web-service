<template>
  <div style="width: 100%">
    <div class="delete-btn" @click="remove()">
      Delete application
    </div>
  </div>
</template>

<script>
export default {
  name: "main-tab",
  title: 'global',
  methods: {

    remove() {
      let appFolder = JSON.parse(this.$store.getters.getApplication).folder
      let user = this.$store.getters.currentUser

      axios.delete(`/apps/${JSON.parse(this.$store.getters.getApplication).id}`)
        .then((res) => {
          axios.get(`/uninstall/${user.user_folder}/${appFolder}`,
              { baseURL: this.$root.nodeUrl}
          )
          this.$root.$emit('app::unset')
          this.$router.push('apps')
        })
    }

  }
}
</script>

<style scoped lang="scss">
.delete-btn {
  color: #3b72a8;
  cursor: pointer;
  width: 100%;
  display: flex;
  margin: 15px 0;
  text-align: center;
  justify-content: center;
  &:hover {
    text-decoration: underline;
  }
}
</style>
