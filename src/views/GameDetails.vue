<template>
    <div>
      <h1 class="text-2xl font-semibold mb-4">{{ game.name }}</h1>
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
    name: 'GameDetails',
    props: ['id'],
    data() {
      return {
        game: {},
        leaderboard: []
      };
    },
    watch: {
      '$route.params.id': {
        immediate: true,
        handler(newId) {
          this.fetchGameDetails(newId);
          this.fetchLeaderboard(newId);
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
      async fetchLeaderboard(id) {
        try {
          const response = await axiosInstance.get(`/games/${id}/leaderboard`);
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
  