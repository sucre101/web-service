<template>
  <div>
    <tag-list v-if="!editTag"/>

    <product-tag v-if="editTag"/>
  </div>
</template>

<script>
import List from "./List"
import Tag from "./Tag"

export default {
  name: "index",
  title: 'tags',

  components: {
    'product-tag': Tag,
    'tag-list': List
  },

  data() {
    return {
      editTag: false,
    }
  },

  created() {
    this.editTag = this.$route.query.hasOwnProperty('tag')
    this.$root.$emit('woo::load', true)
  },

  updated() {
    this.$root.$emit('woo::load', true)
  }
}
</script>

<style scoped>

</style>