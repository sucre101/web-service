<template>
  <div>
    <tag-list v-if="!edit"/>

    <product-tag v-if="edit"/>
  </div>
</template>

<script>
import List from "./List"
import Tag from "./Tag"
import baseHook from "../baseHook";

export default {
  name: "index",
  title: 'tags',
  mixins: [baseHook],
  components: {
    'product-tag': Tag,
    'tag-list': List
  },
}
</script>

<style scoped>

</style>