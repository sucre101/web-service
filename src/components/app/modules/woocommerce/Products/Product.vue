<template>
  <div v-if="product" class="edit-product-form" :class="{ holder: holder }">

    <div class="top-buttons">
      <i class="fas fa-external-link-alt fa-2x" @click="goProductInSite()" title="Go to website"></i>
      <i class="far fa-trash-alt fa-2x" @click="" title="Remove product"></i>
      <i class="fas fa-undo fa-2x" :class="{ active: saveChange }" @click="reload()" title="Revert changes"></i>
      <i class="far fa-save fa-2x" :class="{ active: saveChange }" @click="save()" title="Save product"></i>
    </div>

    <h3>{{ memory.name }}</h3>

    <vue-custom-scrollbar class="content-scroll">

      <div class="main">

        <div class="category-tree">
          <label>Categories</label>
          <CategoryTreeView :items="categories" @choose="selectCategory" :categories="product.categories"/>
        </div>

        <div class="metas">

          <div class="tab-selector">
            <ul>
              <li @click="currentTab = 1">Metas</li>
              <li @click="currentTab = 2">General</li>
              <li @click="currentTab = 3">Attributes</li>
              <li @click="currentTab = 4">Image</li>
            </ul>
          </div>

          <div class="tabs">

            <div v-if="currentTab === 1" class="horizontal-scroll-block">

              <div class="input-group">
                <label>Name</label>
                <input type="text" class="field-input" v-model="product.name">
              </div>

              <div class="input-group">
                <label>Slug</label>
                <input type="text" class="field-input" v-model="product.slug">
              </div>

              <div class="input-group">
                <label>Sku</label>
                <input type="text" class="field-input" v-model="product.sku">
              </div>

              <div class="input-group custom-select">
                <label>Type</label>
                <div class="select">
                  <select v-model="product.type">
                    <option
                      :value="type"
                      v-for="(type, index) in types"
                      :key="index"
                    >
                      {{ type }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="input-group custom-select">
                <label>Status</label>
                <div class="select">
                  <select v-model="product.status">
                    <option
                      :value="status"
                      v-for="(status, index) in statuses"
                      :key="index"
                    >
                      {{ status }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="input-group custom-select">
                <label>Catalog visibility</label>
                <div class="select">
                  <select v-model="product.catalog_visibility">
                    <option
                      :value="item"
                      v-for="(item, index) in catalog_visibility"
                      :key="index"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>

            </div>

            <div v-if="currentTab === 2" class="horizontal-scroll-block">

              <div class="input-group">
                <label>Regular price</label>
                <input type="text" class="field-input" v-model="product['regular_price']">
              </div>

              <div class="input-group">
                <label>Sale price</label>
                <input type="text" class="field-input" v-model="product['sale_price']">
              </div>

              <div class="input-group custom-select">
                <label>Stock status</label>
                <div class="select">
                  <select v-model="product.stock_status">
                    <option 
                      :value="item"
                      v-for="item in stock_status"
                      :key="item.id"
                      >
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>

            </div>

            <div v-if="currentTab === 3" class="horizontal-scroll-block">

              <div
                v-for="attr in product.attributes"
                :key="attr.id"
                class="attribute"
              >
                {{ attr.name }}
                <span class="add-attribute-term" @click="addAttributeTerm($event, attr)">
                  <i class="fas fa-plus fa"></i>
                </span>
                <div class="attribute-terms">
                  <div 
                    v-for="option in attr.options"
                    @click="removeAttributeTerm(option)"
                    :key="option.id"
                  >
                    {{ option }}
                  </div>
                </div>
              </div>

              <div class="add-attribute-link" @click="addAttribute()">Add attribute</div>

              <sweet-modal
                  width="350"
                  overlay-theme="dark"
                  ref="addAttribute"
              >
                <h3>Attributes list</h3>
                <ul ref="listAttributes"></ul>
              </sweet-modal>

            </div>

            <div v-if="currentTab === 4" class="horizontal-scroll-block">
              <div class="img-block">
                <img :src="product.images.length ? product.images[0].src : '/img/no_image.png'">
              </div>
            </div>

          </div>

        </div>

        <div class="descriptions">

          <div class="description-toggle" @click="switchDescription()">
            {{ descriptionViewFull ? 'Short description' : 'Full description' }}
          </div>

          <div class="input-group" v-show="descriptionViewFull">
            <ckeditor :editor="editor" v-model="product.description"></ckeditor>
          </div>

          <div class="input-group" v-show="!descriptionViewFull">
            <ckeditor :editor="editor" v-model="product['short_description']"></ckeditor>
          </div>
        </div>

      </div>

    </vue-custom-scrollbar>


  </div>
</template>

<script>
import CategoryTreeView from "../CategoryTreeView"
import CKEditor from "@ckeditor/ckeditor5-vue"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import {product as PROD} from "../helpers"
import mixins from "../mixins"

export default {
  name: "product",
  mixins: [mixins],
  components: {
    CategoryTreeView, ckeditor: CKEditor.component, vueCustomScrollbar
  },

  data() {
    return {
      editor: ClassicEditor,
      productId: null,
      product: null,
      categories: [],
      attributes: [],
      saveChange: false,
      holder: false,
      memory: null,
      descriptionViewFull: true,
      currentTab: 1,
      attributeTerms: null,
      statuses: PROD.statuses,
      types: PROD.types,
      catalog_visibility: PROD.catalog_visibility,
      stock_status: PROD.stock_status
    }
  },

  created() {
    this.productId = this.$route.query.product

    this._loadItem(`woocommerce/${this.$parent.$parent.moduleId}/products/${this.productId}`)
      .then((res) => {
        this.product = res.product
        this.memory = this._.cloneDeep(this.product)
        this.categories = res.categories
        this.attributes = res.attributes
      })
      .then(res => this.saveChange = false)
  },

  mounted() {
    this.$parent.$parent.$refs.filterBtn.classList.add('hover')
  },

  destroyed() {
    this.$parent.$parent.$refs.filterBtn.classList.remove('hover')
  },

  watch: {
    $route(to, from) {
      if (!to.query.hasOwnProperty(this.$options.name)) {
        this.$parent.editProduct = false
      }
    },

    product: {
      handler(val) {
        this.saveChange = true
      },
      deep: true
    }
  },

  methods: {

    reload() {
      this.product = null
      this.saveChange = false
      this.$nextTick(() => {
        this.product = this._.cloneDeep(this.memory)
      })
    },

    save() {
      this.holder = true

      this._updateItem(`woocommerce/${this.$parent.$parent.moduleId}/products/${this.productId}`, this.product)
        .then((res) => {
          console.log(res)
        })

      // WOO.request(
      //     `woocommerce/${this.$parent.$parent.moduleId}/products/${this.productId}`,
      //     'PATCH',
      //     this.product)
      //   .then((res) => {
      //     this.holder = false
      //     this.memory = this._.cloneDeep(this.product)
      //   })
    },

    addAttribute() {
      this.$refs.addAttribute.open()

      this.$nextTick(() => {
        this._.forEach(this.attributes, val => {
          let index = this._.findIndex(this.product.attributes, { id: val.id })
          if (index === -1) {
            let li = document.createElement('li')
            li.innerText = val.name
            this.$refs.listAttributes.appendChild(li)
            li.addEventListener('click', function(i) {
              this.product.attributes.push({
                id: val.id,
                name: val.name,
                options: [],
                position: 10,
                variation: true,
                visible: true
              })
              li.remove()
            }.bind(this), false)
          }
        })
      })
    },

    removeAttributeTerm($option) {
      console.log($option)
    },

    addAttributeTerm($event, attribute) {

      let findOpenBlock = document.getElementsByClassName('show-terms')

      if (findOpenBlock.length)
        for (let i = 0; i <= findOpenBlock.length; i++)
          findOpenBlock[i].remove()

      axios.get(`woocommerce/${this.$parent.$parent.moduleId}/products/attributes/${attribute.id}/terms`)
        .then((res) => {
          if (res.data.success) {
            this.attributeTerms = res.data.terms
          }
        })
        .then(res => {
          let root = $event.target.offsetParent.offsetParent
          let block = document.createElement('div')
          block.classList.add('show-terms')
          this.attributeTerms.forEach(val => {

            if (!this._.includes(attribute.options, val.name)) {
              let termBlock = document.createElement('div')
              termBlock.classList.add('term')
              termBlock.innerText = val.name
              block.appendChild(termBlock)
              termBlock.addEventListener('click', function (i) {

                let index = this._.findIndex(this.product.attributes, { id: attribute.id })
                if (index !== -1) {
                  this.product.attributes[index].options.push(i.target.innerText)
                  this.product.attributes[index].variation = true
                }

                i.target.remove()

                if (!block.children.length) {
                  block.remove()
                }

              }.bind(this), false)
            }
          })

          root.appendChild(block)
        })
    },

    selectCategory(category) {

      let index = this._.findIndex(this.product.categories, { id: category.id })

      if (index === -1) {
        this.product.categories.push(
            {
              id: category.id,
              name: category.name,
              slug: category.slug
            }
        )
      } else {
        this.product.categories = this._.filter(this.product.categories, val => { return val.id !== category.id })
      }
    },

    switchDescription() {
      this.descriptionViewFull = !this.descriptionViewFull
    },

    goProductInSite() {
      window.open(this.product.permalink, '_blank')
    },

  }
}
</script>

<style scoped lang="scss">
.edit-product-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  .content-scroll {
    max-height: 600px !important;
  }
  &.holder {
    opacity: 0.6;
  }
  > h3 {
    font-size: 24px;
    margin-top: 15px;
    padding: 0 0 15px 0;
    border-bottom: 1px solid #ebebec;
    color: #687c97;
    font-family: "SFProText-Regular", sans-serif;
  }

  .top-buttons {
    position: absolute;
    right: 25px;
    top: 60px;
    color: #f1f5f9;
    width: 145px;
    display: flex;
    justify-content: space-between;
    i {
      cursor: pointer;
      &.active {
        color: rgba(229, 162, 195, 0.97);
        &:hover {
          color: #e54896;
        }
      }
    }
  }
  .main {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .input-group {
      width: 45%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 10px;
      margin-right: 10%;
      label {
        width: 50%;
      }
      &.custom-select {
        .select {
          width: 68%;
          display: flex;
          align-items: flex-start;
          border: 2px solid #edf2f6;
          border-radius: 8px;
          font-size: 15px;
          font-family: "SFProText-Light", sans-serif;
          cursor: pointer;
          flex-direction: row;
          select {
            width: 100%;
            background: none;
            border: none;
            margin: 0;
            display: flex;
            align-self: center;
            padding: 0 10px 0 10px;
          }
        }

      }
      .field-input {
        border: 2px solid #edf2f6;
        border-radius: 8px;
        padding-left: 15px;
        font-size: 15px;
        font-family: "SFProText-Light", sans-serif;
      }
    }
    > div {
      &.category-tree {
        width: 25%;
        border-right: 1px solid #ebebec;
        label {
          width: 100%;
          border-bottom: 1px solid #ebebec;
          padding: 8px 0;
          font-size: 18px;
          font-family: "SFProText-Regular", sans-serif;
        }
      }
      &.metas {
        display: flex;
        width: 75%;
        .tab-selector {
          width: 17%;
          border-right: 1px solid #ebebec;
          margin-right: 20px;
          ul {
            list-style-type: none;
            li {
              border-bottom: 1px solid #ebebec;
              padding: 5px 0;
              cursor: pointer;
            }
          }
        }
        .tabs {
          width: 80%;
          overflow-x: scroll;
          scrollbar-color: #af2c6d #cacfda;
          scrollbar-width: thin !important;
          .horizontal-scroll-block {
            width: auto;
            display: flex;
            flex-direction: column;
            height: 275px;
            flex-wrap: wrap;
            .add-attribute-link {
              cursor: pointer;
              font-size: 14px;
              color: #5c8eec;
              &:hover {
                text-decoration: underline;
              }
            }
            .attribute {
              display: flex;
              flex-direction: column;
              width: 250px;
              margin-bottom: 10px;
              position: relative;
              .add-attribute-term {
                width: 25px;
                height: 25px;
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
                color: #5c8eec;
              }
              .attribute-terms {
                border: 1px solid #ebebec;
                border-radius: 7px;
                padding: 7px 15px;
                display: flex;
                cursor: cell;
                div {
                  text-decoration: underline;
                  color: #5c8eec;
                  cursor: pointer;
                  margin-right: 10px;
                }
              }
            }
          }
        }
      }
      &.descriptions {
        width: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        .input-group {
          width: 100%;
          margin-right: 0;
        }
        .description-toggle {
          display: flex;
          height: 30px;
          justify-content: center;
          align-items: center;
          background: #f9fbfd;
          padding: 5px 10px;
          margin-bottom: 10px;
          cursor: pointer;
          border: 2px solid #ddd;
          border-radius: 7px;
        }
      }
    }
  }
  .img-block {
    width: 200px;
    img {
      width: 100%;
    }
  }
}
</style>