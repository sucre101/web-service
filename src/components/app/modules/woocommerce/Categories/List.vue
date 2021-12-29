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
        @close="close()"
    >
      <div class="edit-form">

        <div class="input-group">
          <input type="text" class="y-input-text" v-model.trim="quickViewData.name" placeholder="Category name">
        </div>

        <div class="input-group">
          <ckeditor :editor="editor" v-model.trim="quickViewData.description"></ckeditor>
        </div>

        <div class="input-group">
          <select v-model="quickViewData.parent">
            <option :value="0">Root</option>
            <template v-for="cat in filteredCat">
              <option :value="cat.id">{{ cat.name }}</option>
            </template>
          </select>
        </div>

      </div>
    </sweet-modal>
  </div>
</template>

<script>
import methods from "../methods";
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Dropdown from "../../../../base/ui/Dropdown";

export default {
  name: "list",
  mixins: [methods],
  components: {
    ckeditor: CKEditor.component,
    Dropdown
  },
  data() {
    return {
      categories: [],
      quickViewData: null,
      editor: ClassicEditor,
      categoryTree: [],
      filteredCat: []
    }
  },

  mounted() {
    this._loadList(`woocommerce/${this.$parent.$parent.moduleId}/categories`)
      .then(res => this.fixCategoryTree())

  },

  methods: {

    getThumb(item) {
      return item.image === null ? require('@/assets/img/no-image.png') : item.image.src;
    },

    editCategory(element) {
      this.quickViewData = this._.cloneDeep(element)
      this.$nextTick(() => {
        this.viewResult()
        this.$refs.edit.open()
        // console.log(this.quickViewData)
      })
    },

    close() {
      this.quickViewData = null
      this.filteredCat = []
    },

    viewResult(slot = this.categoryTree) {
      slot.forEach(val => {
        if (this.quickViewData.id !== val.id)
          this.filteredCat.push({ name: val.name, id: val.id })
        if (val['childs'])
          this.viewResult(val['childs'])
      })
    },

    fixCategoryTree() {
      let childs = [];
      let loc = [...this.list]

      loc.forEach(val => {
        if (val.parent !== 0 && childs[val.parent])
          childs[val.parent].push(val)
        else if (val.parent !== 0 && !childs[val.parent]) {
          childs[val.parent] = []
          childs[val.parent].push(val)
        }
      })

      loc.forEach(val => {
        if (childs[val.id] && val['childs'])
          val['childs'].push(childs[val.id])
        else if (childs[val.id] && !val['childs']) {
          val['childs'] = []
          childs[val.id].forEach(node => {
            val['childs'].push(node)
          })
        }
      })

      return loc.forEach(val => {
        if (val.parent === 0) {
          return this.categoryTree.push(val)
        }
      })
    }

  }
}
</script>

<style lang="scss">
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
  .edit-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .input-group {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      position: relative;
      .y-input-text {
        width: 70%;
      }
    }
  }
  .ck-content {
    max-height: 300px !important;
  }
}
</style>