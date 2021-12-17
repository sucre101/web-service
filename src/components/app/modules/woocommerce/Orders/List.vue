<template>
  <div v-if="orders.length" class="order-list">
    <div v-for="order in orders" class="order" :key="order.id">
      #{{ order.id }} {{ order.billing.first_name }} {{ order.billing.last_name }} {{ dateCreated(order.date_created) }}
    </div>
  </div>
</template>

<script>
import {wooMemory as WOO} from "../helpers"
import AWN from 'awesome-notifications'

export default {
  name: "list",

  data() {
    return {
      orders: [],
    }
  },

  mounted() {
    this._getOrders()
  },

  methods: {

    _getOrders() {

      let folder = this.$root.$store.getters.currentUser['user_folder']

      WOO.request(`woocommerce/${this.$parent.$parent.moduleId}/orders`, 'GET')
        .then((res) => {
          this.orders = this._.cloneDeep(res.orders)

          // new AWN().async(
          //     axios.get(`http://localhost:4000/${folder}`),
          //     'Build complete',
          // )
        })
        .then(res => this.$root.$emit('woo::load', false))
    },

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