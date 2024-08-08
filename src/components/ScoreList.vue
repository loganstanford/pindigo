<template>
    <div v-if="loading" class="text-center p-4">
      Loading scores...
    </div>
    <div v-else class="p-4">
      <div v-if="game" class="text-center mb-4">
        <h3 class="text-2xl font-semibold">{{ game.name }}</h3>
        <img :src="game.bg_url" :alt="game.name" class="mx-auto h-48 object-cover rounded-lg" />
      </div>
      <div v-else class="text-center mb-4">
        No game selected
      </div>
      <ul class="space-y-2">
        <li v-for="score in scores" :key="score.score.id" class="border dark:border-gray-700 p-4 rounded-lg shadow">
          <div class="flex items-center space-x-4">
            <img :src="score.user.profile.avatar || 'https://via.placeholder.com/50'" :alt="score.user.username" class="w-12 h-12 rounded-full" />
            <div>
              <h4 class="text-lg font-semibold">{{ score.user.username }} ({{ score.user.profile.initials }})</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatScore(score.score.score) }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axiosInstance from '../axiosInstance';
  
  export default {
    props: ['locationId', 'gameId'],
    data() {
      return {
        scores: [],
        game: null,
        loading: true,
      };
    },
    watch: {
      gameId: 'fetchScores'
    },
    methods: {
      async fetchScores() {
        this.loading = true;
        try {
          const response = await axiosInstance.get(`/leaderboards/location/${this.locationId}/machine/${this.gameId}`);
          this.scores = response.data.leaderboard;
          if (this.scores.length > 0) {
            this.game = this.scores[0].machine;
          } else {
            this.game = null;
          }
        } catch (error) {
          console.error(error);
          this.game = null;
          this.scores = [];
        } finally {
          this.loading = false;
        }
      },
      formatScore(score) {
        return score.toLocaleString('en-US');
      }
    },
    mounted() {
      this.fetchScores();
    }
  };
  </script>
  