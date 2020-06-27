<template>
  <div class="w-full max-w-6xl m-auto">
    <h2 class="w-1/2 m-auto text-center text-4xl bg-yellow-500 text-gray-900 font-semibold tracking-tight p-1 border-4">
        {{ currentUser.username }}
    </h2>
    <div class="bg-white divide-y divide-gray-400 rounded border-l-8 mt-4 p-4">
      <div>
        <h3>Do</h3>
      </div>
      <div>
        <h3>Schedule</h3>
      </div>
      <div>
        <h3>Delegate</h3>
      </div>
      <div>
        <h3>Eliminate</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Stats',
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser,
      currentMatrix: state => state.matrix.currentMatrix
    })
  }
}
</script>

<style>

</style>
