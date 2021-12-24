<template>
  <div>
    <order-list v-if="!edit" />

    <order v-if="edit" />
  </div>
</template>

<script>
import List from './List'
import Order from './Order'
import baseHook from "../baseHook";

export default {
  name: "index",
  title: 'orders',
  mixins: [baseHook],
  components: {
    'order-list': List,
    'order': Order
  },
}
</script>

<style scoped>

</style>