<template>
  <div>
    <h1 class="text-4xl text-center text-white font-bold mb-4">Register</h1>
    <UserAuthForm hasName=true buttonText="Register" :handleSubmit="registerUser" :error="error"/>
  </div>
</template>

<script>
import UserAuthForm from '../components/UserAuthForm.vue'
export default {
  name: 'UserRegister',
  components: {
    UserAuthForm
  },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    async registerUser (userInfo) {
      if (userInfo.name && userInfo.username && userInfo.password) {
        const user = await this.$store.dispatch('user/register', userInfo)
        if (user.error) {
          this.error = user.error
        } else {
          this.$router.push(`/${user.username}`)
        }
      } else {
        this.error = 'Introduce Name/Username/Password'
      }
    }
  }
}
</script>

<style>

</style>
