<template>
  <div id="emulator">
    <iframe ref="ios" :src="url" frameborder="0" width="100%" height="100%" name="myIframe"></iframe>
  </div>
</template>

<script>
export default {
  name: "emulator",

  data() {
    return {
      url: null
    }
  },

  props: {
    template: {
      type: String,
      default: 'base'
    }
  },

  methods: {
    onLoadIFrame(event) {
      const iframe = this.$refs.ios.contentWindow
      iframe.postMessage({ message: "AppId", value: 1 }, "*")
    }
  }

}
</script>

<style scoped lang="scss">
#emulator {
  width: 420px;
  height: 860px;
  transform: scale(0.8);
  position: absolute;
  right: 0;
  top: 50px;
  border: 15px solid black;
  border-radius: 44px;
  overflow: hidden;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>