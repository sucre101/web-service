<template>
  <div class="flex-direction-row">
    <div v-for="attribute in list">
      <span>{{ attribute.name }}</span>
      <ul v-if="attribute.terms.length">
        <li v-for="term in attribute.terms">
          {{ term.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mixins from "../mixins";

export default {
  name: "list",
  mixins: [mixins],
  data() {
    return {

    }
  },

  created() {
    this._loadList(`woocommerce/${this.$parent.$parent.moduleId}/products/attributes`)
  },

  methods: {
    // _load() {
    //   WOO.request(`woocommerce/${this.$parent.$parent.moduleId}/products/attributes`, 'GET')
    //     .then((res) => {
    //       this.items = this._.cloneDeep(res.attributes)
    //     })
    //     .then(res => this.$root.$emit('woo::load', false))
    // }
  }
}
</script>

<style scoped lang="scss">
.flex-direction-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    width: 19%;
    display: flex;
    flex-direction: column;
    min-height: 150px;
    border: 1px solid;
    margin-right: 1%;
    margin-top: 20px;
    padding: 10px;
    span {
      font-weight: bold;
    }
  }
}
</style>