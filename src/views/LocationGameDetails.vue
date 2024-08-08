<template>
    <div>
      <h1 class="text-2xl font-semibold mb-4">{{ game.name }} - {{ location.name }}</h1>
      <img :src="game.bg_url" alt="" class="w-full h-60 object-cover rounded-lg mb-4" />
      <h2 class="text-xl font-semibold mb-4">Leaderboard</h2>
      <table class="w-full text-left">
        <thead>
          <tr>
            <th class="px-4 py-2">Rank</th>
            <th class="px-4 py-2">Player</th>
            <th class="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in leaderboard" :key="score.id" class="border-t dark:border-gray-700">
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">{{ score.user.username }}</td>
            <td class="px-4 py-2">{{ formatScore(score.score) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axiosInstance from '../axiosInstance';
  
  export default {
    name: 'LocationGameDetails',
    props: ['locationId', 'gameId'],
    data() {
      return {
        game: {},
        location: {},
        leaderboard: []
      };
    },
    watch: {
      '$route.params.gameId': {
        immediate: true,
        handler(newGameId) {
          this.fetchGameDetails(newGameId);
          this.fetchLeaderboard(newGameId);
        }
      },
      '$route.params.locationId': {
        immediate: true,
        handler(newLocationId) {
          this.fetchLocationDetails(newLocationId);
        }
      }
    },
    methods: {
      async fetchGameDetails(id) {
        try {
          const response = await axiosInstance.get(`/games/${id}`);
          this.game = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async fetchLocationDetails(id) {
        try {
          const response = await axiosInstance.get(`/locations/${id}`);
          this.location = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async fetchLeaderboard(gameId) {
        try {
          const response = await axiosInstance.get(`/locations/${this.locationId}/games/${gameId}/leaderboard`);
          this.leaderboard = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      formatScore(score) {
        return score.toLocaleString('en-US');
      }
    }
  };
  </script>
  