<template>
  <component :is="editModule"/>
</template>

<script>
export default {
  name: "edit",

  computed: {

    editModule() {
      return () => import('./' + this.$route.params.folder.toLocaleLowerCase() + '/Index')
        .then(m => m.default)
    }

  },
}
</script>

<style scoped>

</style>
