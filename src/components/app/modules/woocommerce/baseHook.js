export default {
    data() {
        return {
            edit: false,
        }
    },

    created() {
        this.edit = this.$route.query.hasOwnProperty('category')
        this.$root.$emit('loading', true)
    },

    updated() {
        this.$root.$emit('loading', true)
    }
}