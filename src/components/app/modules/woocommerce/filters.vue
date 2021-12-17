<template>
  <div class="filter-bar">
    {{ filterData }}
    <div class="input-group">
      <input type="number" class="field-input" v-model="filterData['per_page']">
    </div>
    <div class="input-group">
      <select id="" v-model="filterData['status']">
        <option value="publish">publish</option>
        <option value="pending">pending</option>
      </select>
    </div>
    <div class="input-group">
      <template v-for="item in [1,2]">
<!--        <input type="checkbox" :value="item" v-model="filterData['categories']">Category {{ item }}-->
      </template>
<!--      <select id="" @change="selectCategories">-->
<!--        <option value="1">Cat 1</option>-->
<!--        <option value="2">peng 2</option>-->
<!--      </select>-->
    </div>
    <div class="save" @click="applyFilterData()">apply</div>
  </div>
</template>

<script>
export default {
  name: "filters",

  props: ['filterData'],

  data() {
    return {
      // filters: baseFilters
    }
  },

  created() {

  },

  methods: {
    applyFilterData() {
      this.$emit('apply', this.filterData)
    },
    selectCategories($event) {
      this.$set(this.filterData, 'categories', $event.target.value)
      console.log(this.filterData)
    }
  }
}
</script>

<style scoped lang="scss">
.filter-bar {
  background: antiquewhite;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50px;
  .save {
    width: 100px;
    height: 25px;
    color: #fff;
    display: flex;
    background: #b77777;
    justify-content: center;
    align-content: center;
    cursor: pointer;
    border-radius: 25px;
    position: absolute;
    right: 15px;
    top: 15px;
  }
}
</style>