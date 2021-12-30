<template>
  <div id="emulator">
    <iframe ref="ios" :src="url" frameborder="0" width="100%" name="myIframe" @load="onLoadIFrame"></iframe>
    <div class="lds-dual-ring" ref="loader"></div>
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
      // const iframe = this.$refs.ios.contentWindow
      // iframe.postMessage({ message: "AppId", value: 1 }, "*")
      setTimeout(() => {
        this.$refs.ios.style.height = '100%'
        this.$refs.loader.remove()
      },3000)

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  iframe {
    width: 100%;
    height: 1%;
  }
  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #af2c6d;
    border-color: #af2c6d transparent #af2c6d transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>