<template>
    <div>
      <h1>User Details</h1>
      <!-- User details go here -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserDetails',
    props: ['id'],
    mounted() {
      // Fetch user details using this.id
    }
  };
  </script>
  