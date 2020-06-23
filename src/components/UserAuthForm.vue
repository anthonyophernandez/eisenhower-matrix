<template>
  <div class="w-full max-w-xs m-auto">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="loginUser(userInfo)">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
        <input v-model="userInfo.username" class="border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline" id="username" type="text" placeholder="Username">
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input v-model="userInfo.password" class="border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline" id="password" type="password" placeholder="Password">
      </div>
      <p v-if="error" class="text-red-600 mb-2">{{ error }}</p>
      <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded" type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserAuthForm',
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async loginUser (userInfo) {
      if (this.userInfo.username && this.userInfo.password) {
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
