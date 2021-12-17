<template>
  <div class="position-list">
    <template v-for="role in positions">
      <div class="item" @click="editRole(role)">
        {{ role.role.name }}
      </div>
    </template>
    <edit-role-modal
        :role="edit"
        v-if="edit !== null || newEl !== false"
        ref="editModal"
        @update="updateRole"
    />
  </div>
</template>

<script>
import EditRoleModal from "./EditRoleModal";

export default {
  name: "index",
  title: 'Roles-Positions',

  components: {
    EditRoleModal
  },

  data() {
    return {
      positions: [],
      edit: null,
      newEl: false
    }
  },

  mounted() {
    this._getPositions()
    this.$on('create::role', () => {
      this.edit = {}
      this.$nextTick(() => {
        this.$refs.editModal.$refs.editRoleForm.open()
      })
    })
  },

  methods: {

    editRole($role) {
      this.edit = $role
      this.$nextTick(() => {
        this.$refs.editModal.$refs.editRoleForm.open()
      })
    },

    updateRole($data) {

      axios.patch('positions', $data)
        .then((res) => {
          if (res.data.success) {
            this.notifier.success(`Position < ${$data.role.name} > is updated`)
          }
        })

    },

    _getPositions() {
      axios.get('positions')
        .then((res) => {
          if (res.data.positions.length) {
            this.positions = [...res.data.positions]
          }
        })
    }

  }
}
</script>

<style scoped lang="scss">
.position-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  .item {
    height: 35px;
    border: 1px solid;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 8px;
    background-color: #8674f4;
    color: white;
    cursor: pointer;
  }
}
</style>