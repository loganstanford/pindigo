<template>
    <div class="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-200">
      <h1 class="text-2xl font-semibold mb-4">Games at {{ location.name }}</h1>
      <GameList :locationId="locationId" @gameSelected="handleGameSelected" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axiosInstance from '../axiosInstance';
  import GameList from './GameList.vue';
  
  export default {
    name: 'LocationGames',
    components: {
      GameList
    },
    props: {
      locationId: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const location = ref({});
  
      const fetchLocation = async () => {
        try {
          const response = await axiosInstance.get(`/api/locations/${props.locationId}`);
          location.value = response.data;
        } catch (error) {
          console.error(error);
        }
      };
  
      onMounted(() => {
        fetchLocation();
      });
  
      const handleGameSelected = (game) => {
        // Handle game selection logic here
        console.log('Selected game:', game);
      };
  
      return {
        location,
        handleGameSelected
      };
    }
  };
  </script>
  