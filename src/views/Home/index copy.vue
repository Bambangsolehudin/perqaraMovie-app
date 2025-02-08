<!-- src/views/Home.vue -->
<template>
    <div class="p-4 bg-indigo-800">
      <h1>Home Page</h1>
      <p>{{ message }}</p>
      <input v-model="newMessage" placeholder="Type a new message" />
      <button @click="updateMessage">Update Message</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
    data() {
      return {
        newMessage: '',
      };
    },
    computed: {
      message() {
        return this.$store.getters.message;
      },
    },
    methods: {
      updateMessage() {
        this.$store.dispatch('updateMessage', this.newMessage);
        this.newMessage = '';
      },
    },
  };
  </script>
  