<template>
  <div class="enter-page">

    <div class="logo">
      <img src="@/assets/img/yappix-logo.png" alt="" />
    </div>

    <h4>Log in to the app-builder</h4>

    <div class="input-group">
      <input type="text" class="input-field" placeholder="email@email.ru">
    </div>

    <div class="input-group">
      <input type="password" class="input-field" placeholder="password">
    </div>

    <div class="button sign-in-button">Sign in</div>

    <div class="button sign-up-button">Sign up</div>

    <span>I forgot my password</span>

    <!--    <InnerTab-->
<!--        :items="tabs"-->
<!--        @change="selectTab"-->
<!--    />-->

<!--    <div class="card">-->

<!--      <template v-if="currentTab === 0 && !isAuth">-->
<!--        <form @submit.prevent="authenticate">-->
<!--          <div class="form-group">-->
<!--            <input type="email" v-model="authForm.email" class="form-control required" placeholder="Email Address" autocomplete="off">-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <input type="password" v-model="authForm.password" class="form-control required" placeholder="Password" autocomplete="off">-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <input type="submit" value="Login" @keyup.enter="authenticate" class="ycms-button bg-green-gradient">-->
<!--          </div>-->
<!--          <div class="form-group" v-if="authError">-->
<!--            <p class="error">-->
<!--              {{ authError }}-->
<!--            </p>-->
<!--          </div>-->
<!--        </form>-->
<!--      </template>-->

<!--      <template v-if="currentTab === 1 && !isAuth">-->

<!--        <form @submit.prevent="register">-->
<!--          <div class="form-group">-->
<!--            <input type="text" v-model="registerForm.name" class="form-control required" placeholder="Your Name" autocomplete="off">-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <input type="email" v-model="registerForm.email" class="form-control required" placeholder="Email Address" autocomplete="off">-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <input type="password" v-model="registerForm.password" class="form-control required" placeholder="Password" autocomplete="off">-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <input type="password" v-model="repeatPass" class="form-control required" placeholder="Repeat your password" autocomplete="off">-->
<!--          </div>-->
<!--          <div class="form-group">-->
<!--            <input type="submit" value="Login" @keyup.enter="register" class="ycms-button bg-green-gradient">-->
<!--          </div>-->
<!--          <div class="form-group" v-if="authError">-->
<!--            <p class="error">-->
<!--              {{ authError }}-->
<!--            </p>-->
<!--          </div>-->
<!--        </form>-->

<!--      </template>-->

<!--    </div>-->
  </div>
</template>

<script>
import { login, register } from "../../helpers/auth"
import InnerTab from "../base/ui/InnerTab"

export default {

  name: "login",

  components: {
    InnerTab
  },

  data() {
    return {
      authForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
      },
      repeatPass: '',
      error: null,
      currentTab: 0,
      tabs: [
        {name: 'Sign In'},
        {name: 'Sign Up'}
      ],
      isAuth: false,
    };
  },

  computed: {
    authError() {
      return this.$store.getters.authError;
    },

    enterTitle() {
      return this.currentTab === 0 ? 'Sign in to your account' : 'Registration account'
    },

    title() {
      return this.currentTab === 0 ? 'Login page' : 'Register page'
    },

    registerEmployee() {
      return this.$route.query.hasOwnProperty('key')
    }

  },

  created() {
    window.setTitle(this.title)

    if (this.itsLink) {
      this.currentTab = 1
    }
  },

  methods: {

    waitForLoad() {
      return new Promise(resolve => {
        resolve();
      })
    },

    authenticate() {
      this.$store.dispatch('login')
      login(this.$data.authForm)
          .then((res) => {

            this.$store.commit("loginSuccess", res)

            this.waitForLoad()
              .then(res => this.$router.push({ name: 'apps' }))

          })
          .catch((error) => {
            this.$store.commit("loginFailed", {error})
          });
    },

    register() {

      if (this.registerForm.password !== this.repeatPass) {
        this.$awn.warning('Second password incorrect')
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

    selectTab(index) {
      this.currentTab = index
    }

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
