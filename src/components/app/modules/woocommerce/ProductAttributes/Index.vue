<template>
  <div>
    <attribute-list v-if="!edit" />

    <product-attribute v-if="edit"/>
  </div>
</template>

<script>
import List from './List'
import Attribute from "./Attribute"

export default {
  name: "index",
  title: 'attributes',

  components: {
    'product-attribute': Attribute,
    'attribute-list': List
  },

  data() {
    return {
      edit: false,
    }
  },

  created() {
    this.edit = this.$route.query.hasOwnProperty('attribute')
    this.$root.$emit('loading', true)
  },

  updated() {
    this.$root.$emit('loading', true)
  }
}
</script>

<style scoped>

</style>