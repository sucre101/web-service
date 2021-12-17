<template>
  <div class="box-list installed-modules">
    <preloader v-if="$root.loading"/>
    <div class="top-header">
      <h4>Installed modules</h4>
    </div>
    <div class="main-block list">
      <div
        class="module"
        v-for="module in modules"
        :key="module.id"
      >
        <div @click="$router.push({
            name: 'module-edit',
              params: {
                moduleId: module.id,
                folder: module.module.front_folder.toLowerCase()
              }
          })">
          <div>
            <img :src="module.module.image">
          </div>
          {{ module.alias || module.module.name }}
        </div>
      </div>
    </div>
    <div class="bottom-footer">

    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      modules: [],
    }
  },

  created() {
    this.$root.$emit('loading', true)
    this._loadModules()
  },

  mounted() {
    window.setTitle(this.$route.meta.title)
  },

  methods: {

    _loadModules() {

      axios.get('module')
        .then((res) => {
          this.modules = [...res.data.modules]

          this.modules.forEach(val => {
            val.module.image = this.$root.baseUrl + val.module.image
          })
        })
        .then(res => this.$root.$emit('loading', false))

    }

  }

}
</script>

<style lang="scss" scoped>
.installed-modules {
  .top-header {
    justify-content: flex-start !important;
    h4 {
      padding-left: 15px;
      font-size: 20px;
      font-family: 'SFProText-Light', sans-serif;
    }
  }
}
</style>
