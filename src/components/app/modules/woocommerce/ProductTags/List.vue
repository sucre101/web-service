<template>
  <div>
    TAG LIST
  </div>
</template>

<script>
export default {
  name: "list",

  data() {
    return {
      tags: []
    }
  },

  mounted() {
    this._load()
  },

  methods: {
    _load() {
      axios.get(`woocommerce/${this.$parent.$parent.moduleId}/products/tags`)
        .then((res) => {
          if (res.data.success) {
            this.tags = this._.cloneDeep(res.data.tags)
            this.$root.$emit('woo::load', false)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>