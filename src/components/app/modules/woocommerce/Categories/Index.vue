<template>
  <div>
    <categories-list v-if="!edit"/>

    <category v-if="edit"/>
  </div>
</template>

<script>
import List from "./List";
import Category from "./Category";
import baseHook from "../baseHook";

export default {
  name: 'index',
  title: 'categories',
  mixins: [baseHook],
  components: {
    'categories-list': List,
    'category': Category,
  },
}
</script>

<style scoped>

</style>