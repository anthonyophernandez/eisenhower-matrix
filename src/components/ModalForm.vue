<template>
  <div v-if="isModalOpen">
    <!-- Form -->
    <div class="bg-white rounded absolute z-50 inset-0 w-2/6 h-64 m-auto">
      <form @submit.prevent="handleSubmit" class="flex flex-col justify-between h-full p-4">
        <h4 class="text-xl text-center text-gray-500 font-bold uppercase tracking-wider">{{ tittleMessage }}</h4>
        <div>
          <label class="text-sm text-gray-700 font-bold" for="description">Description</label>
          <textarea v-model="task.description" class="w-full h-24 rounded bg-gray-900 text-white resize-none p-1" id="description" name="description"></textarea>
        </div>
        <div class="w-full">
          <button @click="closeModal" class="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold rounded py-2 px-4 rounded-r-none">Cancel</button>
          <button type="submit" class="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 rounded-l-none">{{ buttonMessage }}</button>
        </div>
      </form>
    </div>
    <!-- Background -->
    <div class="fixed z-40 inset-0 opacity-25 bg-gray-900"></div>
  </div>
</template>

<script>
export default {
  name: 'ModalForm',
  props: ['task', 'isModalOpen', 'buttonMessage', 'tittleMessage', 'handleSubmit'],
  methods: {
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style>

</style>
