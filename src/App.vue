<template>
  <div id="app" class="bg-gray-500 min-h-screen p-4">
    <div class="text-right rounded mx-1 mt-1 mb-4 p-1">

      <button
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        v-if="!currentUser.username"
        @click="login"
      >
        Log In
      </button>
      <button
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        v-else
        @click="logoutUser"
      >
        Log Out
      </button>

    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  created () {
    this.$store.dispatch('user/loadCurrent')
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser
    })
  },
  methods: {
    logoutUser () {
      this.$store.dispatch('user/logout')
      this.$router.push('/')
    },
    login () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
