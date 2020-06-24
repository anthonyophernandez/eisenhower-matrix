<template>
  <h1>{{ this.$route.params.username }}</h1>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserView',
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser,
      currentMatrix: state => state.matrix.currentMatrix
    })
  },
  created () {
    this.$store.dispatch('matrix/load', this.currentUser.matrixId)
  }
}
</script>

<style>

</style>
