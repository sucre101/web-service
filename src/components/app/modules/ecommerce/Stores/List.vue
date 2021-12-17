<template>
  <div class="table-list-items">

    <div class="shops-without-structure" v-if="storeList.length">

      <draggable
        :list="storeList"
        :disabled="false"
        class="list-group"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
        <div
          class="list-group-item"
          v-for="store in storeList"
          :key="store.id"
        >
          <div class="item-title">
            <img src="@/assets/img/drag-drop.svg" alt="" class="handle">
            {{ store.name }}
          </div>

          <div class="item-actions">
            <div class="btn-action-edit" @click="editStore(store.id)">
              <img src="@/assets/img/edit.png" alt="">
            </div>
            <div @click="deleteStore(store.id)">
              <img src="@/assets/img/garbage.png" alt="">
            </div>
          </div>

        </div>
      </draggable>

    </div>

    <div class="action-group" style="width: auto">
      <div class="actions" style="width: auto">

      </div>
    </div>

    <create-store-modal
      ref="newShopModal"
      @submitted="addStore"
    />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import {moduleUrl} from "@/helpers/general"
import CreateStoreModal from "@/components/app/modules/ecommerce/Stores/modals/CreateStoreModal"

export default {
  name: "stores-list",

  components: {
    CreateStoreModal,
    draggable,
  },

  data() {
    return {
      storeList: [],
      userModuleId: Number(this.$route.params.moduleId),
      currencies: [
        { id: 1, name: 'EUR' },
        { id: 2, name: 'USD' },
        { id: 3, name: 'RUB' },
      ],
    }
  },

  created() {
    this._loadData();
  },

  mounted() {
    this.$parent.$parent.$on('add::element', v => {
      this.$refs.newShopModal.open()
    })
  },

  methods: {

    _loadData() {

      axios.get(`${moduleUrl(this.$route)}/store`)
          .then((res) => {
            this.storeList = this._.cloneDeep(res.data.stores)
            this.$nextTick(() => {
              this.$parent.loading = false
            })
          })

    },

    editStore(id) {
      this.$parent.loading = true;

      this.$router.replace({ query: { tab: 'stores', store: id } })
    },

    addStore(data) {
      axios.put(`${moduleUrl(this.$route)}/store`, data)
        .then((res) => {
          this.storeList = this._.cloneDeep(res.data.stores)
        })
    },

    deleteStore(id) {

      axios.post(`${moduleUrl(this.$route)}/delete-store`, { store_id: id})
          .then((res) => {
            this.storeList = this._.cloneDeep(res.data.stores)
          })

    }

  }

}
</script>

<style scoped lang="scss">
.table-list-items {
  width: 80%;
  margin: auto;
  .list-group {
    display: flex;
    flex-direction: column;

    .list-group-item {
      display: flex;
      flex-direction: row;
      padding: 10px 15px;
      align-items: center;
      justify-content: space-between;

      .item-title {
        width: 40%;
        max-width: 400px;
        display: flex;
        justify-content: flex-start;

        .handle {
          cursor: move;
          padding-right: 10px;
        }
      }
      .item-actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        width: 15%;

        div {
          margin-right: 15px;
          cursor: pointer;
        }

        .btn-action-edit {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
