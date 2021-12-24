<template>
  <div v-if="item">
    {{ item.name }}
  </div>
</template>

<script>
import methods from "../methods";

export default {
  name: "category",
  mixins: [methods],
  data() {
    return {
      categoryId: null,
    }
  },

  created() {
    this.categoryId = this.$route.query.category
    this._loadItem(`woocommerce/${this.$parent.$parent.moduleId}/categories/${this.categoryId}`)
  },

  watch: {
    $route(to, from) {
      if (!to.query.hasOwnProperty(this.$options.name)) {
        this.$parent.edit = false
      }
    },
  },

  methods: {

  }
}
</script>

<style scoped>

</style>