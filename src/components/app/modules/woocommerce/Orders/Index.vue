<template>
  <div>
    <order-list v-if="!editOrder" />

    <order v-if="editOrder" />
  </div>
</template>

<script>
import List from './List'
import Order from './Order'

export default {
  name: "index",
  title: 'orders',

  components: {
    'order-list': List,
    'order': Order
  },

  data() {
    return {
      loading: false,
      editOrder: false,
    }
  },

  created() {
    this.editProduct = this.$route.query.hasOwnProperty('order')
    this.$root.$emit('woo::load', true)
  },

  updated() {
    this.$root.$emit('woo::load', true)
  }
}
</script>

<style scoped>

</style>