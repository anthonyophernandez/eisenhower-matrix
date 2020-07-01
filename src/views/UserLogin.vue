<template>
  <div>
    <h1 class="text-4xl text-center text-white font-bold mb-4">Log In</h1>
    <UserAuthForm :handleSubmit="loginUser" buttonText="Log In" :error="error"/>
  </div>

</template>

<script>
export default {
  name: 'UserLogin',
  components: {
    UserAuthForm: () => import(/* webpackChunkName: 'UserAuthForm' */ '../components/UserAuthForm.vue')
  },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    async loginUser (userInfo) {
      if (userInfo.username && userInfo.password) {
        const user = await this.$store.dispatch('user/login', userInfo)
        if (user.error) {
          this.error = user.error
        } else {
          this.$router.push(`/${user.username}`)
        }
      } else {
        this.error = 'Introduce Username/Password'
      }
    }
  }
}
</script>

<style>

</style>
