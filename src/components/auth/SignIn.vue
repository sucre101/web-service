<template>
  <div class="enter-page">

    <div class="logo">
      <img src="@/assets/img/yappix-logo.png" alt="" />
    </div>

    <h4>Log in to the app-builder</h4>

    <div class="input-group">
      <input type="text" class="input-field" placeholder="email@email.ru" v-model.trim="authForm.email">
    </div>

    <div class="input-group">
      <input type="password" class="input-field" placeholder="password" v-model.trim="authForm.password">
    </div>

    <button
        type="button"
        class="button sign-in-button"
        ref="signinBtn"
        @click="authenticate($event)"
        @keyup.enter="authenticate($event)"
    >Sign in</button>

    <div class="button sign-up-button" @click="$router.push({name: 'sign-up'})">Sign up</div>

    <span>I forgot my password</span>
  </div>
</template>

<script>
import { login, register } from "../../helpers/auth"

export default {

  name: "sign-in",

  data() {
    return {
      authForm: {
        email: '',
        password: ''
      },
      error: null,
    };
  },

  computed: {
    authError() {
      return this.$store.getters.authError;
    },

    registerEmployee() {
      return this.$route.query.hasOwnProperty('key')
    }

  },

  created() {
    window.setTitle('Sign in')
  },

  methods: {

    waitForLoad() {
      return new Promise(resolve => {
        resolve();
      })
    },

    authenticate($event) {

      $event.preventDefault()
      this.$refs.signinBtn.setAttribute('disabled', 'disabled')

      this.$store.dispatch('login')

      this.$awn.asyncBlock(
          login(this.$data.authForm),
          response => {
            console.log(123)
            this.$store.commit("loginSuccess", response)
            this.$awn.success(`Login successful`)
            this.waitForLoad()
                .then(res => this.$router.push({ name: 'apps' }))
          },
          error => {
            this.$store.commit("loginFailed", {error})
            this.$refs.signinBtn.removeAttribute('disabled')
            this.authForm.password = ''
            this.$awn.alert('Authorize error. Login or password is wrong')
          }
      )
    },

  }
}
</script>

<style scoped lang="scss">
.error {
  text-align: center;
  color: red;
}
.card {
  .form-group {
    margin-bottom: 20px;
    input[type="text"], input[type="email"], input[type="password"] {
      border-radius: 22px;
      border: solid 1px #868686;
      background: #fff;
      filter: none;
      width: 100%;
      display: flex;
      height: 40px;
      padding: 0 25px;
      color: #0997b1;
      font-size: 14px;
      outline: none;
    }
  }
  .ycms-button {
    margin-top: 35px;
    border: none;
    width: 100%;
  }
}
</style>
