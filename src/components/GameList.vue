<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="game in games"
        :key="game.id"
        @click="selectGame(game)"
        class="cursor-pointer border dark:border-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
      >
        <img :src="game.bg_url" alt="" class="w-full h-48 object-cover mb-4 rounded-lg" />
        <h4 class="text-lg font-semibold">{{ game.name }}</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ game.manuf.name }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axiosInstance from '../axiosInstance';
  
  export default {
    props: {
      locationId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        games: []
      };
    },
    async mounted() {
      try {
        const response = await axiosInstance.get(`/api/leaderboards/location/${this.locationId}`);
        this.games = response.data.leaderboard.map(entry => entry.machine);
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
      selectGame(game) {
        this.$emit('gameSelected', game);
      }
    }
  };
  </script>
  