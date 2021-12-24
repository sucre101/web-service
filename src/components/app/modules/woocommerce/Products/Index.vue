<template>
  <div>
    <product-list v-if="!edit" />

    <product v-if="edit" />

  </div>
</template>

<script>

import List from "./List";
import Product from "./Product";
import baseHook from "../baseHook";

export default {
  name: 'index',
  title: 'products',
  mixins: [baseHook],
  components: {
    'product-list': List,
    'product': Product,
  },
}
</script>

<style scoped>

</style>