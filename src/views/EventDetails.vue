<template>
    <div>
      <h1>Event Details</h1>
      <!-- Event details go here -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'EventDetails',
    props: ['id'],
    mounted() {
      // Fetch event details using this.id
    }
  };
  </script>
  