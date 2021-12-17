<template>
  <div>
    <product-list v-if="!edit" />

    <product v-if="edit" />

  </div>
</template>

<script>

import List from "./List";
import Product from "./Product";

export default {
  name: 'index',
  title: 'products',
  components: {
    'product-list': List,
    'product': Product,
  },

  data() {
    return {
      loading: false,
      edit: false,
    }
  },

  created() {
    this.edit = this.$route.query.hasOwnProperty('product')
    this.$root.$emit('woo::load', true)
  },

  updated() {
    this.$root.$emit('woo::load', true)
  }
}
</script>

<style scoped>

</style>