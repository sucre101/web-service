<template>
  <div class="table-list-items">
    <template v-if="list.length">
      <div
        v-for="category in list"
        class="item"
        :key="category.id"
        @click="editCategory(category)"
      >
        <span>{{ category.name }}</span>
        <img :src="getThumb(category)"  alt=""/>
      </div>
    </template>
    <sweet-modal
        class="modal"
        ref="edit"
        width="640"
        overlay-theme="dark"
        v-if="quickViewData"
    >
      <div class="edit-form">

        <div class="input-group">
          <input type="text" class="field-input" v-model.trim="quickViewData.name">
        </div>

      </div>
    </sweet-modal>
  </div>
</template>

<script>
import mixins from "../mixins";

export default {
  name: "list",
  mixins: [mixins],
  data() {
    return {
      categories: [],
      quickViewData: null,
    }
  },

  mounted() {
    this._loadList(`woocommerce/${this.$parent.$parent.moduleId}/categories`)
  },

  methods: {

    getThumb(item) {
      return item.image === null ? `/img/no_image.png` : item.image.src;
    },

    editCategory(element) {
      this.quickViewData = element
      this.$nextTick(() => {
        this.$refs.edit.open()
        console.log(this.quickViewData)
      })
    }

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
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
    }
    span {
      position: absolute;
      bottom: 0
    }
  }
}
</style>