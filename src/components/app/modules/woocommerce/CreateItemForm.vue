<template>
  <div>
    <sweet-modal
        class="modal"
        ref="addItem"
        width="550"
        overlay-theme="dark"
    >
      <h4>Create {{ form.name }}</h4>

      <div>

        <template v-for="field in form.fields">
          <div class="input-group">
            <input type="text" v-model.trim="form.bind.name" class="field-input" :placeholder="field.placeholder">
          </div>
        </template>

        <div class="submit" @click="submit()">Send</div>

      </div>

    </sweet-modal>
  </div>
</template>

<script>
export default {
  name: "create-item-form",

  props: ['form'],

  created() {
    this.$set(this.form, 'bind', {})
  },

  mounted() {
    this.$refs.addItem.open()
  },

  methods: {
    submit() {
      this.$emit('complete', this.form.bind)
      let promise = axios.post(`woocommerce/${this.$parent.moduleId}/${this.form.postUrl}`, this.form.bind)
      this.$awn.async(promise, 'Successful')
    }
  }
}
</script>

<style scoped>

</style>