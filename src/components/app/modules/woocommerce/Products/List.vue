<template>
  <div class="table-list-items">
    <template v-if="list.length">
      <div
        v-for="item in list"
        :key="item.id"
        class="item"
        @click="_editView(item, 'products', 'product')"
      >
        <div class="thumb">
          <img :src="item.images.length ? item.images[0].src : '/img/no_image.png'">
        </div>
        {{ item.name }}
      </div>
    </template>
  </div>
</template>

<script>
import {objFilterToUrlParams} from "../helpers"
import methods from "../methods";

export default {
  name: "list",
  mixins: [methods],
  data() {
    return {
      products: [],
    }
  },
  created() {
    let filters = objFilterToUrlParams(this.$parent.$parent.filters)
    this._loadList(`woocommerce/${this.$parent.$parent.moduleId}/products?${filters}`)
  },

  methods: {


  }
}
</script>

<style scoped lang="scss">
.table-list-items {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 15px;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 15%;
    border: 1px solid;
    margin-right: 15px;
    margin-bottom: 15px;
    justify-content: center;
    min-height: 175px;
    cursor: pointer;

    .thumb {
      width: 100%;
      height: 100%;
      display: flex;

      img {
        width: 100%;
      }
    }
  }
}
</style>