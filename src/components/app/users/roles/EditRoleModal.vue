<template>
  <div>
    <sweet-modal
        class="modal"
        ref="editRoleForm"
        width="350"
        overlay-theme="dark"
        @close="closeModal"
    >
      <h4>{{ label }} Role</h4>

      <div v-if="!_.isEmpty(role)">
        <input type="text" v-model.trim="role.role.name" placeholder="Role name">
      </div>

      <div v-else>
        <input type="text" placeholder="Role name" ref="name">
      </div>

      <div class="permission-block">
        <div v-for="perm in permissions" class="permission">
          <label>{{ perm.name }}</label>
          <input type="checkbox" :checked="checkPermission(perm.id)" @click="togglePermission(perm)">
        </div>
      </div>

    </sweet-modal>
  </div>
</template>

<script>
import {permissions} from "../../../../store/getters"

export default {
  name: "edit-role-modal",

  props: {
    role: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      permissions: permissions,
      activeForSave: false,
    }
  },

  mounted() {
    if (this._.isEmpty(this.role)) {
      this.$set(this.role, 'role', {})
    }
  },

  computed: {
    label() {
      return !this.role.hasOwnProperty('id') ? 'Create' : 'Edit'
    }
  },

  watch: {

    role: {
      handler(val) {
        this.activeForSave = true
      },
      deep: true
    }

  },

  methods: {

    closeModal() {
      if (this.activeForSave && this.role.id) {
        this.$emit('update', this.role)
      } else if (this.activeForSave && this.role.hasOwnProperty('id')) {
        this.$emit('create', this.role)
      }
    },

    checkPermission(permissionId) {
      let result = false
      if (!this._.isEmpty(this.role) && this.role.role.hasOwnProperty('id')) {
        this.role.role.permissions.forEach(val => {
          if (permissionId === val.id) {
            result = true
          }
        })
      }
      return result
    },

    togglePermission(permission) {
      if (!this._.isEmpty(this.role) && this.role.role.hasOwnProperty('id')) {
        if (this.checkPermission(permission.id)) {
          let index = this._.findIndex( this.role.role.permissions, { id: permission.id })
          this.role.role.permissions.splice(index, 1)
        } else {
          this.role.role.permissions.push(permission)
        }
      } else {
        if (this.role.hasOwnProperty('role')) {

          if (!this.role.role.hasOwnProperty('permissions')) {
            this.$set(this.role.role, 'permissions', [])
          }
          this.role.role.permissions.push(permission)
        }
        console.log(this.role)
      }
    },
  }
}
</script>

<style scoped lang="scss">
.permission-block {
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .permission {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    label {
      margin: 0;
    }
  }
}
</style>