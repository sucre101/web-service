<template>
  <div class="content">
    <span v-for="tag in tagList" class="tag">
          {{tag.name}}
          <i @click="deleteTagConfirm(tag.id)"  class="fa fa-trash" ></i>
    </span>

    <div class="newTag">
      <vue-bootstrap-typeahead
          ref="tagName"
          v-model="tag.name"
          :data="tags"
          placeholder="Enter a tag"
      />
      <a class="small-rounded-btn blue-bg" @click="storeTag">Add tag</a>
    </div>
  </div>
</template>

<script>
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

  export default {
    name: "tag-list",
    components: {
      VueBootstrapTypeahead
    },

    data() {
      return {
        tagList: [],
        tags: [],
        module: {},
        post: {},
        markedForDelete: 0,
        tag: {
          name: '',
          user_module_id: null,
          post_id: null
        }
      }
    },

    created() {
      this.module.id = this.$parent.$parent.$parent.moduleId
      this.post.id = this.$route.query.post
      this.tag.user_module_id = this.module.id
      this.tag.post_id = this.post.id
      this.loadData()
    },

    methods: {
      loadData() {
        axios.get(`/${this.$route.params.folder.toLowerCase()}/post/${this.post.id}/getTags`)
        .then((res) => {
          this.tagList = this._.cloneDeep(res.data.tagList)
          this.tags = this._.cloneDeep(res.data.tags)
        })
      },
      storeTag(){
        if (!this.tag.name){
          this.$awn.warning('Tag name is empty');
          return false;
        }
        axios.post(`/${this.$route.params.folder.toLowerCase()}/${this.module.id}/post/addTag`, {
          tag: this.tag
        })
        .then(res => {
          this.tagList = this._.cloneDeep(res.data.tagList)
          this.tags = this._.cloneDeep(res.data.tags)
          this.tag.name = '';
          this.$awn.success('Tag added successfully');
        })
      },
      deleteTagConfirm(id){
        this.markedForDelete = id;
        this.$awn.confirm('Are you sure?', this.deleteTag())
      },
      deleteTag(){
        axios.post(`/${this.$route.params.folder.toLowerCase()}/${this.module.id}/post/deleteTag`, {
          id: this.markedForDelete,
          post_id: this.post.id
        })
        .then(res => {
          this.tagList = this._.cloneDeep(res.data.tagList)
          this.tags = this._.cloneDeep(res.data.tags)
          this.$awn.success('Tag deleted successfully')
        })
      },
    }

  }
</script>

<style scoped lang="scss">

  .content {
    margin-top: 25px;
    width: 100%;
    background-color: white;
    padding: 25px 50px;
    display: flex;

    flex-flow: row wrap;
    justify-content: flex-start;
  }
  .tag{
    border: 1px solid;
    border-radius: 10px;
    box-shadow: 2px 2px 10px;
    padding: 5px;
    margin: 5px;
  }
  .newTag{
    width: 100%;
    margin-top: 25px;
    display: flex;
    flex-direction: row;

    a{
      margin-left: 20px;
    }
  }
</style>
