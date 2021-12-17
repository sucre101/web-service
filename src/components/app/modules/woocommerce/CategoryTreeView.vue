<template>
  <div>
    <ul v-if="items.length">
      <li v-for="item in items">
        <div>
          <input
              type="checkbox"
              :value="item.id"
              :checked="checkValue(item.id)"
              @click="choose(item)"
          >{{ item.name }}
          <template v-if="item.childs">
            <category-tree-view :items="item.childs" @choose="selectCategory" :categories="categories"/>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "category-tree-view",

  props: ['items', 'categories'],

  computed: {

    product() {
      return {
        categories: this.categories
      }
    }

  },

  methods: {

    checkValue($id) {
      let index = this._.findIndex(this.product.categories, { id: $id })
      return index !== -1
    },

    choose(elem) {
      this.$emit('choose', elem)
    },

    selectCategory(elem) {
      this.$emit('choose', elem)
    }

  }
}
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  input[type="checkbox"] {
    margin-right: 5px;
  }
}
</style>