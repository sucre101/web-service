<template>
  <div v-if="category">
    {{ category.name }}
  </div>
</template>

<script>
export default {
  name: "category",

  data() {
    return {
      categoryId: null,
      category: null
    }
  },

  created() {
    this.categoryId = this.$route.query.category
    this._load()
  },

  watch: {
    $route(to, from) {
      if (!to.query.hasOwnProperty(this.$options.name)) {
        this.$parent.edit= false
      }
    },
  },

  methods: {

    _load() {
      axios.get(`woocommerce/${this.$parent.$parent.moduleId}/categories/${this.categoryId}`)
        .then((res) => {
          if (res.data.success) {
            this.category = this._.cloneDeep(res.data.category)
            console.log(this.category);
            this.$root.$emit('woo::load', false)
          }
        })

    }

  }
}
</script>

<style scoped>

</style>