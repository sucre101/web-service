<template>
  <div class="enter-page">

    <div class="logo">
      <img src="@/assets/img/yappix-logo.png" alt="" />
    </div>

    <h4>Sign up</h4>

    <div class="input-group">
      <input type="text" class="input-field" placeholder="Your first name" autocomplete="off" v-model.trim="registerForm.name">
    </div>

    <div class="input-group">
      <input type="text" class="input-field" placeholder="Your lastname name" autocomplete="off" v-model.trim="registerForm.lastname">
    </div>

    <div class="input-group">
      <input type="email" class="input-field" placeholder="email@email.com" autocomplete="off" v-model.trim="registerForm.email">
    </div>

    <div class="input-group">
      <input type="text" class="input-field" placeholder="Your phone number" autocomplete="off" v-model.trim="registerForm.phone">
    </div>

    <div class="input-group">
      <input type="password" class="input-field" placeholder="Create your own password" autocomplete="off" v-model.trim="registerForm.password">
    </div>

    <div class="politics" :class="{ error: error }">
      <ToggleCheck :value="acceptPolitics" @complete="checkPolitic"/>
      <p>I accept all the terms of the user agreement
        and the personal data processing policy</p>
    </div>

    <div class="button sign-in-button" @click="register()">Sign up</div>

    <div class="button sign-up-button" @click="$router.push({name: 'sign-in'})">I have an account</div>

  </div>
</template>

<script>
import { login, register } from "../../helpers/auth"
import ToggleCheck from "../base/ui/ToggleCheck";

export default {

  name: "sign-up",

  components: {
    ToggleCheck
  },

  data() {
    return {
      registerForm: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: ''
      },
      repeatPass: '',
      error: null,
      acceptPolitics: false
    };
  },

  computed: {

    registerEmployee() {
      return this.$route.query.hasOwnProperty('key')
    }

  },

  watch: {

    acceptPolitics(_old, _new) {
      console.log(_old, _new)
    }

  },

  created() {
    window.setTitle('Sign up')
  },

  methods: {

    waitForLoad() {
      return new Promise(resolve => {
        resolve();
      })
    },

    register() {

      if (!this.acceptPolitics) {
        this.$awn.warning('Second password incorrect')
        this.error = true
        return false;
      }

      if (this.registerEmployee) {
        this.$data.registerForm.key = this.$route.query.key
      }

      register(this.$data.registerForm)
          .then((res) => {
            this.$store.commit('loginSuccess', res)

            this.waitForLoad()
                .then(res => this.$router.push({ name: 'apps' }))
          })

    },

    checkPolitic($val) {
      this.acceptPolitics = $val.value
    }

  }
}
</script>

