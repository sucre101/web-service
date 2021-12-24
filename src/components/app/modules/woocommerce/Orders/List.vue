<template>
  <div v-if="list.length" class="order-list">
    <div v-for="order in list" class="order" :key="order.id">
      #{{ order.id }} {{ order.billing.first_name }} {{ order.billing.last_name }} {{ dateCreated(order.date_created) }}
    </div>
  </div>
</template>

<script>
import methods from "../methods";

export default {
  name: "list",
  mixins: [methods],

  created() {
    this._loadList(`woocommerce/${this.$parent.$parent.moduleId}/orders`)
  },

  methods: {
    dateCreated($date) {
      return this.$luxon($date, { output: { format: "relative", relative: { style: "short" }, locale: 'en' } })
    }
  }
}
</script>

<style scoped lang="scss">
.order-list {
  display: flex;
  flex-direction: column;
}
</style>