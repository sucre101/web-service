<template>
  <div>
    <attribute-list v-if="!editAttribute" />

    <product-attribute v-if="editAttribute"/>
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
      editAttribute: false,
    }
  },

  created() {
    this.editAttribute = this.$route.query.hasOwnProperty('attribute')
    this.$root.$emit('woo::load', true)
  },

  updated() {
    this.$root.$emit('woo::load', true)
  }
}
</script>

<style scoped>

</style>