<template>
  <div>
    <categories-list v-if="!edit"/>

    <category v-if="edit"/>
  </div>
</template>

<script>
import List from "./List";
import Category from "./Category";

export default {
  name: 'index',
  title: 'categories',
  components: {
    'categories-list': List,
    'category': Category,
  },

  data() {
    return {
      edit: false,
    }
  },

  created() {
    this.edit = this.$route.query.hasOwnProperty('category')
    this.$root.$emit('woo::load', true)
  },

  updated() {
    this.$root.$emit('woo::load', true)
  }
}
</script>

<style scoped>

</style>